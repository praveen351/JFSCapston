package com.jfs.capston.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.jfs.capston.helper.FileUpDowHelper;
import com.jfs.capston.service.FileUpDowService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
@RequestMapping("/impexp")
public class FileUpDowController {

	@Autowired
	FileUpDowService fileService;

	@PostMapping("/eupload/{sid}")
	public ResponseEntity<String> euploadFile(@RequestParam("file") MultipartFile file, @PathVariable("sid") long sid) {
		String message = "";

		if (FileUpDowHelper.hasExcelFormat(file)) {
			try {
				fileService.esave(file, sid);
				message = "Uploaded the file successfully: " + file.getOriginalFilename();
				return ResponseEntity.status(HttpStatus.OK).body(new String(message));
			} catch (Exception e) {
				message = "Could not upload the file: " + file.getOriginalFilename() + "!";
				return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new String(message));
			}
		}

		message = "Please upload an excel file!";
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new String(message));
	}

	@PostMapping("/cupload/{sid}")
	public ResponseEntity<String> cuploadFile(@RequestParam("file") MultipartFile file, @PathVariable("sid") long sid) {
		String message = "";

		if (FileUpDowHelper.hasCSVFormat(file)) {
			try {
				fileService.csave(file, sid);
				message = "Uploaded the file successfully: " + file.getOriginalFilename();
				return ResponseEntity.status(HttpStatus.OK).body(new String(message));
			} catch (Exception e) {
				message = "Could not upload the file: " + file.getOriginalFilename() + "!";
				return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new String(message));
			}
		}

		message = "Please upload an excel file!";
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new String(message));
	}

	@GetMapping("/edownload/{sid}")
	public ResponseEntity<Resource> getxlFile(@PathVariable("sid") long sid) {
		String filename = "candidate.xlsx";
		InputStreamResource file = new InputStreamResource(fileService.eload(sid));
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
	}

	@GetMapping("/cdownload/{sid}")
	public ResponseEntity<Resource> getcsvFile(@PathVariable("sid") long sid) {
		String filename = "candidate.csv";
		InputStreamResource file = new InputStreamResource(fileService.cload(sid));
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("text/csv")).body(file);
	}

	@GetMapping("/eddownload/{sid}")
	public ResponseEntity<Resource> getdxlFile(@PathVariable("sid") long sid) {
		String filename = "candidate_detail.xlsx";
		InputStreamResource file = new InputStreamResource(fileService.edeload(sid));
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel")).body(file);
	}

	@GetMapping("/cddownload/{sid}")
	public ResponseEntity<Resource> getdcsvFile(@PathVariable("sid") long sid) {
		String filename = "candidate_detail.csv";
		InputStreamResource file = new InputStreamResource(fileService.cdeload(sid));
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("text/csv")).body(file);
	}

}
