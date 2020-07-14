package com.jfs.capston.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Check;

@Entity
@Table(name = "CandidateResponse")
@Check(constraints = "status IN ('ACTIVE','DEAD')")
@SequenceGenerator(name = "candidate_res_seq", initialValue = 1)
public class CandidateResponseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "candidate_res_seq")
	@Column(name = "candidate_res_id")
	private long candidate_res_id;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "sdcreid")
	private SurveyDetailEntity surveydetailentity;

	@Column(name = "candidate_response")
	private String candidate_response;

	@Column(name = "status")
	private String status;

	public CandidateResponseEntity(SurveyDetailEntity surveydetailentity, String candidate_response, String res_pro_val,
			String status) {
		super();
		this.surveydetailentity = surveydetailentity;
		this.candidate_response = candidate_response;
		this.status = status;
	}
	
	public CandidateResponseEntity() {
		super();
	}

	public SurveyDetailEntity getSurveydetailentity() {
		return surveydetailentity;
	}

	public long getCandidate_res_id() {
		return candidate_res_id;
	}

	public void setCandidate_res_id(long candidate_res_id) {
		this.candidate_res_id = candidate_res_id;
	}

	public void setSurveydetailentity(SurveyDetailEntity surveydetailentity) {
		this.surveydetailentity = surveydetailentity;
	}

	public String getCandidate_response() {
		return candidate_response;
	}

	public void setCandidate_response(String candidate_response) {
		this.candidate_response = candidate_response;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
