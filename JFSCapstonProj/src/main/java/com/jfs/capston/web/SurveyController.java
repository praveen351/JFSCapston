package com.jfs.capston.web;

import java.util.List;
import java.util.concurrent.TimeUnit;
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
import com.jfs.capston.model.ResponseTypeEntity;
import com.jfs.capston.model.SurveyEntity;
import com.jfs.capston.service.ResponseTypeService;
import com.jfs.capston.service.SurveyDetailService;
import com.jfs.capston.service.SurveyService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/survey")
public class SurveyController {
	private SurveyService survey_service;
	private ResponseTypeService response_type_service;
	private SurveyDetailService survey_detail_service;

	@Autowired
	public SurveyController(SurveyService survey_service, ResponseTypeService response_type_service,
			SurveyDetailService survey_detail_service) {
		this.survey_service = survey_service;
		this.response_type_service = response_type_service;
		this.survey_detail_service = survey_detail_service;
	}

	@PostMapping("/saveSurvey")
	public ResponseEntity<SurveyEntity> saveSurvey(@RequestBody SurveyEntity survey) {
		if (survey.getSurvey_detail_list().size() != 0) {
			SurveyEntity surveyobj = survey_detail_service.addSurvey(survey);
			return new ResponseEntity<SurveyEntity>(surveyobj, new HttpHeaders(), HttpStatus.OK);
		} else {
			SurveyEntity surveyobj = survey_service.saveSurveyEntity(survey);
			return new ResponseEntity<SurveyEntity>(surveyobj, new HttpHeaders(), HttpStatus.OK);
		}
	}

	@DeleteMapping("/deleteSurveyDetail/{survey_detail_id}")
	public ResponseEntity<Integer> deleteSurveyDetail(@PathVariable("survey_detail_id") long survey_detail_id) {
		int dtastatus = survey_detail_service.deleteSurveyDetail(survey_detail_id);
		return new ResponseEntity<Integer>(dtastatus, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/getAllSurvey")
	public ResponseEntity<List<SurveyEntity>> getAllSurvey() {
		List<SurveyEntity> surveyList = survey_service.getSurveyList();
		return new ResponseEntity<List<SurveyEntity>>(surveyList, new HttpHeaders(), HttpStatus.OK);
	}

	@DeleteMapping("/deleteSurvey/{survey_id}")
	public ResponseEntity<Integer> deleteSurvey(@PathVariable("survey_id") long survey_id) {
		int deletestatus = survey_service.deleteSurvey(survey_id);
		return new ResponseEntity<Integer>(deletestatus, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/getAllResponseType")
	public ResponseEntity<List<ResponseTypeEntity>> getAllResponseType() {
		List<ResponseTypeEntity> responseList = response_type_service.getResponseTypeList();
		return new ResponseEntity<List<ResponseTypeEntity>>(responseList, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/getResponseType/{response_type_id}")
	public ResponseEntity<ResponseTypeEntity> getResponseType(@PathVariable("response_type_id") long response_type_id) {
		ResponseTypeEntity response = response_type_service.getResponseType(response_type_id);
		return new ResponseEntity<ResponseTypeEntity>(response, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/getSurvey/{survey_id}")
	public ResponseEntity<SurveyEntity> getSurvey(@PathVariable("survey_id") long survey_id) {
		SurveyEntity survey = survey_service.getSurveyEntity(survey_id);
		return new ResponseEntity<SurveyEntity>(survey, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/getLoader")
	public ResponseEntity<SurveyEntity> getLoader() {
		try {
			TimeUnit.SECONDS.sleep(5);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ResponseEntity<SurveyEntity>(new SurveyEntity(), new HttpHeaders(), HttpStatus.OK);
	}
}