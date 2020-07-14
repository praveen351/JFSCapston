package com.jfs.capston.model.apimodel;

public class CandidateMailResponse {
	long candidate_id;
	String mail_sent_status;
	
	public CandidateMailResponse() {
		super();
	}
	
	public CandidateMailResponse(long candidate_id, String mail_sent_status) {
		super();
		this.candidate_id = candidate_id;
		this.mail_sent_status = mail_sent_status;
	}

	public long getCandidate_id() {
		return candidate_id;
	}

	public void setCandidate_id(long candidate_id) {
		this.candidate_id = candidate_id;
	}

	public String getMail_sent_status() {
		return mail_sent_status;
	}

	public void setMail_sent_status(String mail_sent_status) {
		this.mail_sent_status = mail_sent_status;
	}
	
}
