package com.jfs.capston.helper;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.csv.QuoteMode;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import com.jfs.capston.model.CandidateEntity;
import com.jfs.capston.model.CandidateResponseEntity;

public class FileUpDowHelper {
	public static String ETYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
	public static String CTYPE = "text/csv";
	static String SHEET = "Sheet1";
	private static List<String> cdexport = Arrays.asList("CANDIDATE_MAIL", "SURVEY_QUESTION", "SURVEY_ANSWER",
			"SURVEY_RESPONSE_TYPE");
	private static List<String> cexport = Arrays.asList("CANDIDATE_ID", "CANDIDATE_MAIL", "CANDIDATE_NAME",
			"CLOSE_TIME", "OPEN_TIME", "RESPONSE_DATE");

	public static boolean hasExcelFormat(MultipartFile file) {

		if (!ETYPE.equals(file.getContentType())) {
			return false;
		}

		return true;
	}

	public static boolean hasCSVFormat(MultipartFile file) {

		if (!CTYPE.equals(file.getContentType())) {
			return false;
		}

		return true;
	}

	public static ByteArrayInputStream tutorialsToExcel(List<CandidateEntity> tutorials) {

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			CellStyle style = workbook.createCellStyle();
			Font font = workbook.createFont();
			font.setFontName(HSSFFont.FONT_ARIAL);
			font.setFontHeightInPoints((short) 10);
			font.setBold(true);
			style.setFont(font);

			int rowIdx = 0;
			Row row = sheet.createRow(rowIdx++);

			for (String cdata : cexport)
				row.createCell(cexport.indexOf(cdata)).setCellValue(cdata);

			for (int j = 0; j <= 5; j++)
				row.getCell(j).setCellStyle(style);

			for (CandidateEntity tutorial : tutorials) {
				Row row1 = sheet.createRow(rowIdx++);

				row1.createCell(0).setCellValue(tutorial.getCandidate_id());
				row1.createCell(1).setCellValue(tutorial.getCandidate_email());
				row1.createCell(2).setCellValue(tutorial.getCandidate_name());
				row1.createCell(3).setCellValue(tutorial.getClose_time());
				row1.createCell(4).setCellValue(tutorial.getOpen_time());
				row1.createCell(5).setCellValue(tutorial.getResponse_date());
			}

			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {
			throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
		}
	}

	public static List<CandidateEntity> excelToTutorials(InputStream is) {
		try {
			Workbook workbook = new XSSFWorkbook(is);

			Sheet sheet = workbook.getSheet(SHEET);
			Iterator<Row> rows = sheet.iterator();

			List<CandidateEntity> tutorials = new ArrayList<CandidateEntity>();

			int rowNumber = 0;
			while (rows.hasNext()) {
				Row currentRow = rows.next();

				// skip header
				if (rowNumber == 0) {
					rowNumber++;
					continue;
				}
				Iterator<Cell> cellsInRow = currentRow.iterator();

				CandidateEntity tutorial = new CandidateEntity();

				int cellIdx = 0;
				while (cellsInRow.hasNext()) {
					Cell currentCell = cellsInRow.next();

					switch (cellIdx) {
					case 0:
						break;
					case 1:
						tutorial.setCandidate_name(currentCell.getStringCellValue());
						break;
					case 2:
						tutorial.setCandidate_email(currentCell.getStringCellValue());
						break;
					default:
						break;
					}

					cellIdx++;
				}
				tutorial.setCandidate_mail_list(null);
				tutorial.setCandidate_response_list(null);
				tutorial.setStatus("ACTIVE");
				tutorials.add(tutorial);
			}

			workbook.close();

			return tutorials;
		} catch (IOException e) {
			throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
		}
	}

	public static List<CandidateEntity> csvToTutorials(InputStream is) {
		try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
				CSVParser csvParser = new CSVParser(fileReader,
						CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

			List<CandidateEntity> tutorials = new ArrayList<CandidateEntity>();

			Iterable<CSVRecord> csvRecords = csvParser.getRecords();

			for (CSVRecord csvRecord : csvRecords) {
				CandidateEntity tutorial = new CandidateEntity(null, null, csvRecord.get("NAME"),
						csvRecord.get("EMAIL"), null, null, null, "ACTIVE");

				tutorials.add(tutorial);
			}

			return tutorials;
		} catch (IOException e) {
			throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
		}
	}

	public static ByteArrayInputStream tutorialsToCSV(List<CandidateEntity> tutorials) {
		final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);

		try (ByteArrayOutputStream out = new ByteArrayOutputStream();
				CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {
			csvPrinter.printRecord(cexport);
			for (CandidateEntity tutorial : tutorials) {
				List<String> data = Arrays.asList(Long.toString(tutorial.getCandidate_id()),
						tutorial.getCandidate_email(), tutorial.getCandidate_name(), tutorial.getClose_time(),
						tutorial.getOpen_time(), tutorial.getResponse_date());

				csvPrinter.printRecord(data);
			}

			csvPrinter.flush();
			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {
			throw new RuntimeException("fail to import data to CSV file: " + e.getMessage());
		}
	}

	public static ByteArrayInputStream tutorialsToExcelDetail(List<CandidateEntity> tutorials) {

		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			Sheet sheet = workbook.createSheet(SHEET);

			CellStyle style = workbook.createCellStyle();
			Font font = workbook.createFont();
			font.setFontName(HSSFFont.FONT_ARIAL);
			font.setFontHeightInPoints((short) 10);
			font.setBold(true);
			style.setFont(font);

			int rowIdx = 0;
			Row row = sheet.createRow(rowIdx++);

			for (String cdata : cdexport)
				row.createCell(cdexport.indexOf(cdata)).setCellValue(cdata);

			for (int j = 0; j < 4; j++)
				row.getCell(j).setCellStyle(style);

			List<CandidateResponseEntity> cdresponse;

			for (CandidateEntity tutorial : tutorials) {
				cdresponse = tutorial.getCandidate_response_list();
				for (CandidateResponseEntity cdentity : cdresponse) {
					Row row1 = sheet.createRow(rowIdx++);
					row1.createCell(0).setCellValue(tutorial.getCandidate_email());
					row1.createCell(1).setCellValue(cdentity.getSurveydetailentity().getSurvey_question());
					row1.createCell(2).setCellValue(cdentity.getCandidate_response());
					row1.createCell(3)
							.setCellValue(cdentity.getSurveydetailentity().getResponseentity().getResponse_type());
				}
			}

			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {
			throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
		}
	}

	public static ByteArrayInputStream tutorialsToCSVDetail(List<CandidateEntity> tutorials) {
		final CSVFormat format = CSVFormat.DEFAULT.withQuoteMode(QuoteMode.MINIMAL);

		try (ByteArrayOutputStream out = new ByteArrayOutputStream();
				CSVPrinter csvPrinter = new CSVPrinter(new PrintWriter(out), format);) {
			List<CandidateResponseEntity> cdresponse;
			csvPrinter.printRecord(cdexport);
			for (CandidateEntity tutorial : tutorials) {
				cdresponse = tutorial.getCandidate_response_list();
				for (CandidateResponseEntity cdentity : cdresponse) {
					List<String> data;
					data = Arrays.asList(tutorial.getCandidate_email(),
							cdentity.getSurveydetailentity().getSurvey_question(), cdentity.getCandidate_response(),
							cdentity.getSurveydetailentity().getResponseentity().getResponse_type());
					csvPrinter.printRecord(data);
				}
			}

			csvPrinter.flush();
			return new ByteArrayInputStream(out.toByteArray());
		} catch (IOException e) {
			throw new RuntimeException("fail to import data to CSV file: " + e.getMessage());
		}
	}

}
