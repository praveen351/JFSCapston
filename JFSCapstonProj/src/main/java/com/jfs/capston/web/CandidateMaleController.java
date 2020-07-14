package com.jfs.capston.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jfs.capston.model.CandidateEntity;
import com.jfs.capston.model.CandidateMail;
import com.jfs.capston.model.apimodel.CandidateMailResponse;
import com.jfs.capston.model.apimodel.CandidateSelectedMail;
import com.jfs.capston.service.CandidateMailService;
import com.jfs.capston.service.CandidateService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/mail")
public class CandidateMaleController {
	private CandidateMailService candidate_mail_service;
	private CandidateService candidate_service;

	@Autowired
	public CandidateMaleController(CandidateMailService candidate_mail_service, CandidateService candidate_service) {
		this.candidate_mail_service = candidate_mail_service;
		this.candidate_service = candidate_service;
	}

	@PostMapping("/sendCandidateMail")
	public ResponseEntity<List<CandidateMailResponse>> sendCandidateMail(@RequestBody CandidateSelectedMail csmail) {
		List<CandidateMailResponse> candidate_mail_list = candidate_mail_service.addCandidateMail(csmail);
		return new ResponseEntity<List<CandidateMailResponse>>(candidate_mail_list, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/getCandidateMails/{candidate_id}")
	public ResponseEntity<List<CandidateMail>> getCandidateMail(@PathVariable("candidate_id") long candidate_id) {
		List<CandidateMail> survey_list = new ArrayList<CandidateMail>();
		survey_list = candidate_mail_service.getCandidateMailStatus(candidate_id);
		return new ResponseEntity<List<CandidateMail>>(survey_list, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/sendCandidateConfirmationMail")
	public ResponseEntity<Integer> sendCandidateConfirmationMail(@RequestBody CandidateEntity candidate) {
		candidate = candidate_service.getSpecCandidate(candidate.getCandidate_id());
		int candi_confirm_mail_id = candidate_mail_service.sendCandidateMailStatus(candidate);
		return new ResponseEntity<Integer>(candi_confirm_mail_id, new HttpHeaders(), HttpStatus.OK);
	}
}
