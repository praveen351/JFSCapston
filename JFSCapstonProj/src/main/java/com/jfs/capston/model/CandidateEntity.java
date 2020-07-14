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
@Table(name = "Candidate")
@Check(constraints = "status IN ('ACTIVE','DEAD')")
@SequenceGenerator(name = "candidate_seq", initialValue = 1)
public class CandidateEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "candidate_seq")
	@Column(name = "candidate_id")
	private long candidate_id;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "cecdeid")
	private List<CandidateResponseEntity> candidate_response_list;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "cecmid")
	private List<CandidateMail> candidate_mail_list;
	
	@Column(name = "candidate_name")
	private String candidate_name;

	@Column(name = "candidate_email", unique = true)
	private String candidate_email;

	@Column(name = "response_date")
	private String response_date;

	@Column(name = "open_time")
	private String open_time;

	@Column(name = "close_time")
	private String close_time;

	@Column(name = "status")
	private String status;
	
	public CandidateEntity(List<CandidateResponseEntity> candidate_response_list,
			List<CandidateMail> candidate_mail_list, String candidate_name, String candidate_email,
			String response_date, String open_time, String close_time, String status) {
		super();
		this.candidate_response_list = candidate_response_list;
		this.candidate_mail_list = candidate_mail_list;
		this.candidate_name = candidate_name;
		this.candidate_email = candidate_email;
		this.response_date = response_date;
		this.open_time = open_time;
		this.close_time = close_time;
		this.status = status;
	}

	public CandidateEntity() {
		super();
	}

	public long getCandidate_id() {
		return candidate_id;
	}

	public void setCandidate_id(long candidate_id) {
		this.candidate_id = candidate_id;
	}

	public List<CandidateResponseEntity> getCandidate_response_list() {
		return candidate_response_list;
	}

	public void setCandidate_response_list(List<CandidateResponseEntity> candidate_response_list) {
		this.candidate_response_list = candidate_response_list;
	}

	public String getCandidate_name() {
		return candidate_name;
	}

	public void setCandidate_name(String candidate_name) {
		this.candidate_name = candidate_name;
	}

	public String getCandidate_email() {
		return candidate_email;
	}

	public void setCandidate_email(String candidate_email) {
		this.candidate_email = candidate_email;
	}

	public String getResponse_date() {
		return response_date;
	}

	public void setResponse_date(String response_date) {
		this.response_date = response_date;
	}

	public String getOpen_time() {
		return open_time;
	}

	public void setOpen_time(String open_time) {
		this.open_time = open_time;
	}

	public String getClose_time() {
		return close_time;
	}

	public void setClose_time(String close_time) {
		this.close_time = close_time;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<CandidateMail> getCandidate_mail_list() {
		return candidate_mail_list;
	}

	public void setCandidate_mail_list(List<CandidateMail> candidate_mail_list) {
		this.candidate_mail_list = candidate_mail_list;
	}
	
}

