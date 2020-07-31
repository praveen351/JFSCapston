package com.jfs.capston.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jfs.capston.helper.FileUpDowHelper;
import com.jfs.capston.model.CandidateEntity;
import com.jfs.capston.model.SurveyEntity;
import com.jfs.capston.repository.CandidateRepository;
import com.jfs.capston.repository.SurveyRepository;

@Service
public class FileUpDowService {
	@Autowired
	CandidateRepository repository;

	@Autowired
	SurveyRepository survey_repo;

	public void esave(MultipartFile file, long sid) {
		try {
			List<CandidateEntity> tutorials = FileUpDowHelper.excelToTutorials(file.getInputStream());
			repository.saveAll(tutorials);
			for (CandidateEntity candidateEntity : tutorials)
				repository.updateCandidate(sid, candidateEntity.getCandidate_id());
		} catch (IOException e) {
			throw new RuntimeException("fail to store excel data: " + e.getMessage());
		}
	}

	public ByteArrayInputStream eload(long sid) {
		List<CandidateEntity> tutorials = repository.findAllSurveyedCandidate(sid);
		ByteArrayInputStream in = FileUpDowHelper.tutorialsToExcel(tutorials);
		return in;
	}

	public void csave(MultipartFile file, long sid) {
		try {
			List<CandidateEntity> tutorials = FileUpDowHelper.csvToTutorials(file.getInputStream());
			repository.saveAll(tutorials);
			for (CandidateEntity candidateEntity : tutorials)
				repository.updateCandidate(sid, candidateEntity.getCandidate_id());
		} catch (IOException e) {
			throw new RuntimeException("fail to store csv data: " + e.getMessage());
		}
	}

	public ByteArrayInputStream cload(long sid) {
		List<CandidateEntity> tutorials = repository.findAllSurveyedCandidate(sid);
		ByteArrayInputStream in = FileUpDowHelper.tutorialsToCSV(tutorials);
		return in;
	}

	public ByteArrayInputStream edeload(long sid) {
		List<CandidateEntity> tutorials = repository.findAllSurveyedCandidate(sid);
		ByteArrayInputStream in = FileUpDowHelper.tutorialsToExcelDetail(tutorials);
		return in;
	}

	public ByteArrayInputStream cdeload(long sid) {
		List<CandidateEntity> tutorials = repository.findAllSurveyedCandidate(sid);
		ByteArrayInputStream in = FileUpDowHelper.tutorialsToCSVDetail(tutorials);
		return in;
	}
}
