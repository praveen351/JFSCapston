package com.jfs.capston.model.apimodel;

import java.util.List;

import com.jfs.capston.model.CandidateEntity;

public class CandidateSelectedMail {
	List<CandidateEntity> selectedCandidate;
	
	public CandidateSelectedMail() {
		super();
	}

	public List<CandidateEntity> getSelectedCandidate() {
		return selectedCandidate;
	}

	public void setSelectedCandidate(List<CandidateEntity> selectedCandidate) {
		this.selectedCandidate = selectedCandidate;
	}
	
}
