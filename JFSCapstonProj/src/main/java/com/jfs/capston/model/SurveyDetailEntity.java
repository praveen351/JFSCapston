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
@Table(name = "Survey_Detail")
@Check(constraints = "status IN ('ACTIVE','DEAD')")
@SequenceGenerator(name = "survey_detail_seq", initialValue = 1)
public class SurveyDetailEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "survey_detail_seq")
	@Column(name = "survey_detail_id")
	private long survey_detail_id;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "sdrenid")
	private ResponseTypeEntity responseentity;

	@Column(name = "survey_question")
	private String survey_question;

	@Column(name = "res_pro_val")
	private String res_pro_val;
	
	@Column(name = "user_res_scope")
	private String user_res_scope;
	
	@Column(name = "status")
	private String status;

	public SurveyDetailEntity() {
		super();
	}

	public SurveyDetailEntity(ResponseTypeEntity responseentity, String survey_question, String res_pro_val,
			String user_res_scope,String status) {
		super();
		this.responseentity = responseentity;
		this.survey_question = survey_question;
		this.res_pro_val = res_pro_val;
		this.user_res_scope = user_res_scope;
		this.status = status;
	}

	public long getSurvey_detail_id() {
		return survey_detail_id;
	}

	public void setSurvey_detail_id(long survey_detail_id) {
		this.survey_detail_id = survey_detail_id;
	}

	public ResponseTypeEntity getResponseentity() {
		return responseentity;
	}

	public void setResponseentity(ResponseTypeEntity responseentity) {
		this.responseentity = responseentity;
	}

	public String getSurvey_question() {
		return survey_question;
	}

	public void setSurvey_question(String survey_question) {
		this.survey_question = survey_question;
	}

	public String getRes_pro_val() {
		return res_pro_val;
	}

	public void setRes_pro_val(String res_pro_val) {
		this.res_pro_val = res_pro_val;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getUser_res_scope() {
		return user_res_scope;
	}

	public void setUser_res_scope(String user_res_scope) {
		this.user_res_scope = user_res_scope;
	}
}