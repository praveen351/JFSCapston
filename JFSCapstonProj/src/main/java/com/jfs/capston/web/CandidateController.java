package com.jfs.capston.web;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jfs.capston.model.CandidateEntity;
import com.jfs.capston.model.SurveyDetailEntity;
import com.jfs.capston.model.SurveyEntity;
import com.jfs.capston.service.CandidateService;
import com.jfs.capston.service.SurveyDetailService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/candidate")
public class CandidateController {
	private CandidateService candidate_service;
	private SurveyDetailService survey_detail_service;

	@Autowired
	public CandidateController(CandidateService candidate_service, SurveyDetailService survey_detail_service) {
		this.candidate_service = candidate_service;
		this.survey_detail_service = survey_detail_service;
	}

	@PostMapping("/saveCandidate")
	public ResponseEntity<SurveyEntity> saveCandidate(@RequestBody SurveyEntity survey) {
		SurveyEntity ssurvey = candidate_service.addCandidate(survey);
		return new ResponseEntity<SurveyEntity>(ssurvey, new HttpHeaders(), HttpStatus.OK);
	}

	@DeleteMapping("/deleteCandidate/{candidate_id}")
	public ResponseEntity<Integer> deleteCandidate(@PathVariable("candidate_id") long candidate_id) {
		int dtastatus = candidate_service.deleteCandidate(candidate_id);
		return new ResponseEntity<Integer>(dtastatus, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/validateCandidate")
	public ResponseEntity<Long> validateCandidate(@RequestBody CandidateEntity candidate) {
		long mailvalidate = candidate_service.getCandidate_SurveyMailConf(candidate.getCandidate_email(),
				candidate.getCandidate_name());
		long scandidate_id = candidate_service.getCandidate_Survey(candidate.getCandidate_email(),
				candidate.getCandidate_name());
		long date_status = candidate_service.validateDate(scandidate_id);
		if (mailvalidate != 0 && scandidate_id != 0 && date_status != 0) {
			return new ResponseEntity<Long>(scandidate_id, new HttpHeaders(), HttpStatus.OK);
		}
		return new ResponseEntity<Long>((long) 0, new HttpHeaders(), HttpStatus.OK);

		// long scandidate_id =
		// candidate_service.getCandidate_Survey(candidate.getCandidate_email(),
		// candidate.getCandidate_name());
		// long date_status = candidate_service.validateDate(scandidate_id);
		// if (scandidate_id != 0 && date_status != 0) {
		// return new ResponseEntity<Long>(scandidate_id, new HttpHeaders(),
		// HttpStatus.OK);
		// }
		// return new ResponseEntity<Long>((long) 0, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/getCandidateId")
	public ResponseEntity<Long> getCandidateId(@RequestBody CandidateEntity candidate) {
		long scandidate_id = candidate_service.getCandidate_ID(candidate.getCandidate_email(),
				candidate.getCandidate_name());
		return new ResponseEntity<Long>(scandidate_id, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/getCandidate/{survey_id}")
	public ResponseEntity<List<SurveyDetailEntity>> getCandidateSurvey(@PathVariable("survey_id") long survey_id) {
		List<SurveyDetailEntity> survey_list = new ArrayList<SurveyDetailEntity>();
		survey_list = survey_detail_service.getAllCondSurveyeDetail(survey_id);
		return new ResponseEntity<List<SurveyDetailEntity>>(survey_list, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/setCandidateResponse")
	public ResponseEntity<Long> setCandidateResponse(@RequestBody CandidateEntity candidate) {
		long scandidate_id = candidate_service.updateCandidate(candidate);
		return new ResponseEntity<Long>(scandidate_id, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/getCandidatesStatus/{survey_id}")
	public ResponseEntity<Map<String, List<CandidateEntity>>> getCandidatesStatus(
			@PathVariable("survey_id") long survey_id) {
		Map<String, List<CandidateEntity>> candidate_fix_data = candidate_service.getCandidateData(survey_id);
		return new ResponseEntity<Map<String, List<CandidateEntity>>>(candidate_fix_data, new HttpHeaders(),
				HttpStatus.OK);
	}
}
