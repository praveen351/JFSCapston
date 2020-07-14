package com.jfs.capston.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Check;

@Entity
@Table(name = "Survey")
@Check(constraints = "status IN ('ACTIVE','DEAD')")
@SequenceGenerator(name = "survey_seq", initialValue = 1)
public class SurveyEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "survey_seq")
	@Column(name = "surveyid")
	private long surveyid;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "sseid")
	private List<SurveyDetailEntity> survey_detail_list;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "cseid")
	private List<CandidateEntity> candidate_list;
	
	@Column(name = "servey_name", length = 20, unique = true)
	private String servey_name;

	@Column(name = "opening_date_time")
	private String opening_date_time;

	@Column(name = "closing_date_time")
	private String closing_date_time;

	@Column(name = "no_of_question")
	private int no_of_question;

	@Column(name = "no_of_candidate")
	private int no_of_candidate;

	@Column(name = "status")
	private String status;

	public SurveyEntity() {
		super();
		this.surveyid = 0;
	}

	public SurveyEntity(List<SurveyDetailEntity> survey_detail_list, List<CandidateEntity> candidate_list,
			String servey_name, String opening_date_time, String closing_date_time, int no_of_question,
			int no_of_candidate, String status) {
		super();
		this.survey_detail_list = survey_detail_list;
		this.candidate_list = candidate_list;
		this.servey_name = servey_name;
		this.opening_date_time = opening_date_time;
		this.closing_date_time = closing_date_time;
		this.no_of_question = no_of_question;
		this.no_of_candidate = no_of_candidate;
		this.status = status;
	}

	public long getSurveyid() {
		return surveyid;
	}

	public void setSurveyid(long surveyid) {
		this.surveyid = surveyid;
	}

	public List<SurveyDetailEntity> getSurvey_detail_list() {
		return survey_detail_list;
	}

	public void setSurvey_detail_list(List<SurveyDetailEntity> survey_detail_list) {
		this.survey_detail_list = survey_detail_list;
	}

	public List<CandidateEntity> getCandidate_list() {
		return candidate_list;
	}

	public void setCandidate_list(List<CandidateEntity> candidate_list) {
		this.candidate_list = candidate_list;
	}

	public String getServey_name() {
		return servey_name;
	}

	public void setServey_name(String servey_name) {
		this.servey_name = servey_name;
	}

	public String getOpening_date_time() {
		return opening_date_time;
	}

	public void setOpening_date_time(String opening_date_time) {
		this.opening_date_time = opening_date_time;
	}

	public String getClosing_date_time() {
		return closing_date_time;
	}

	public void setClosing_date_time(String closing_date_time) {
		this.closing_date_time = closing_date_time;
	}

	public int getNo_of_question() {
		return no_of_question;
	}

	public void setNo_of_question(int no_of_question) {
		this.no_of_question = no_of_question;
	}

	public int getNo_of_candidate() {
		return no_of_candidate;
	}

	public void setNo_of_candidate(int no_of_candidate) {
		this.no_of_candidate = no_of_candidate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}