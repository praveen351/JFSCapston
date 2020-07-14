package com.jfs.capston.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jfs.capston.model.SurveyEntity;
import com.jfs.capston.repository.CandidateRepository;
import com.jfs.capston.repository.SurveyDetailRepository;
import com.jfs.capston.repository.SurveyRepository;

@Service
public class SurveyService {
	private SurveyRepository survey_repo;
	private SurveyDetailRepository survey_detail_repo;
	private CandidateRepository candidate_repo;
	
	@Autowired
	public SurveyService(SurveyRepository survey_repo, 
			SurveyDetailRepository survey_detail_repo,
			CandidateRepository candidate_repo) {
		this.survey_repo = survey_repo;
		this.survey_detail_repo = survey_detail_repo;
		this.candidate_repo = candidate_repo; 
	}

	public SurveyEntity saveSurveyEntity(SurveyEntity survey) {
		SurveyEntity surveyobj = survey_repo.save(survey);
		return surveyobj;
	}

	public SurveyEntity getSurveyEntity(long survey_id) {
		SurveyEntity surveyobj = survey_repo.findById(survey_id).get();
		surveyobj.setSurvey_detail_list(survey_detail_repo.findAllSurveyDetail(survey_id));
		surveyobj.setCandidate_list(candidate_repo.findAllCandidateResponse(survey_id));
		return surveyobj;
	}

	public List<SurveyEntity> getSurveyList() {
		List<SurveyEntity> surveyList = survey_repo.findAllSurvey();
		return surveyList;
	}

	public int deleteSurvey(long survey_id) {
		return survey_repo.deleteSurvey(survey_id);
	}

}