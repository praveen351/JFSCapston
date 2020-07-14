package com.jfs.capston.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Check;

@Entity
@Table(name = "CandidateMail")
@Check(constraints = "status IN ('ACTIVE','DEAD') AND sent_status IN ('SUCCESS','FAILURE')")
@SequenceGenerator(name = "candidate_mail_seq", initialValue = 1)
public class CandidateMail {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "candidate_mail_seq")
	@Column(name = "candidate_mail_id")
	private long candidate_mail_id;
	
	@Column(name = "mail_date")
	private String mail_date;
	
	@Column(name = "sent_status")
	private String sent_status;
	
	@Column(name = "status")
	private String status;
	
	public CandidateMail() {
		super();
	}

	public CandidateMail(String mail_date, String sent_status, String status) {
		super();
		this.mail_date = mail_date;
		this.sent_status = sent_status;
		this.status = status;
	}

	public long getCandidate_mail_id() {
		return candidate_mail_id;
	}

	public void setCandidate_mail_id(long candidate_mail_id) {
		this.candidate_mail_id = candidate_mail_id;
	}

	public String getMail_date() {
		return mail_date;
	}

	public void setMail_date(String mail_date) {
		this.mail_date = mail_date;
	}

	public String getSent_status() {
		return sent_status;
	}

	public void setSent_status(String sent_status) {
		this.sent_status = sent_status;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
}


