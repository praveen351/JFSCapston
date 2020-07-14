package com.jfs.capston.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jfs.capston.model.SurveyDetailEntity;
import com.jfs.capston.model.SurveyEntity;
import com.jfs.capston.repository.SurveyDetailRepository;
import com.jfs.capston.repository.SurveyRepository;

@Service
public class SurveyDetailService {
	private SurveyDetailRepository survey_detail_repo;
	private SurveyRepository survey_repo;

	@Autowired
	public SurveyDetailService(SurveyDetailRepository survey_detail_repo, SurveyRepository survey_repo) {
		this.survey_detail_repo = survey_detail_repo;
		this.survey_repo = survey_repo;
	}

	public SurveyDetailEntity saveSurveyDetailEntity(SurveyDetailEntity survey_detail) {
		SurveyDetailEntity surveyobj = survey_detail_repo.save(survey_detail);
		return surveyobj;
	}

	public SurveyEntity addSurvey(SurveyEntity survey) {
		long survey_id = survey.getSurveyid();
		List<SurveyDetailEntity> seDetailList = survey.getSurvey_detail_list();
		for (SurveyDetailEntity surveyDetailEntity : seDetailList) {
			long responset = surveyDetailEntity.getResponseentity().getResponse_type_id();
			surveyDetailEntity.setResponseentity(null);
			survey_detail_repo.save(surveyDetailEntity);
			survey_detail_repo.updateSurveyDetail(responset, survey_id, surveyDetailEntity.getSurvey_detail_id());
		}
		return survey_repo.findById(survey_id).get();
	}

	public int deleteSurveyDetail(long survey_detail_id) {
		return survey_detail_repo.deleteSurveyDetail(survey_detail_id);
	}
	
	public List<SurveyDetailEntity> getAllCondSurveyeDetail(long survey_id) {
		return survey_detail_repo.findAllSurveyDetail(survey_id);
	}
}
