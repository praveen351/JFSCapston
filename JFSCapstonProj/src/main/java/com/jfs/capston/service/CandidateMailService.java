package com.jfs.capston.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jfs.capston.mailserver.MailIDValidator;
import com.jfs.capston.mailserver.MailServer;
import com.jfs.capston.model.CandidateEntity;
import com.jfs.capston.model.CandidateMail;
import com.jfs.capston.model.apimodel.CandidateMailResponse;
import com.jfs.capston.model.apimodel.CandidateSelectedMail;
import com.jfs.capston.repository.CandidateMailRepository;

@Service
public class CandidateMailService {
	private CandidateMailRepository candidate_mail_repo;

	@Autowired
	public CandidateMailService(CandidateMailRepository candidate_mail_repo) {
		this.candidate_mail_repo = candidate_mail_repo;
	}

	public List<CandidateMail> getCandidateMailStatus(long candidate_id) {
		return candidate_mail_repo.findAllCandidateMail(candidate_id);
	}

	public List<CandidateMailResponse> addCandidateMail(CandidateSelectedMail candidate_mail_data) {
		Date date = Calendar.getInstance().getTime();
		DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
		String strDate = dateFormat.format(date);

		List<CandidateEntity> candidate_list = candidate_mail_data.getSelectedCandidate();
		List<String> candidate_mail = new ArrayList<String>();
		List<CandidateMailResponse> candidate_mail_list = new ArrayList<CandidateMailResponse>();

		for (CandidateEntity candidate_entity : candidate_list) {
			String sent_status = "";
			boolean dataStatus = MailIDValidator.isAddressValid(candidate_entity.getCandidate_email());
			if (dataStatus) {
				candidate_mail.add(candidate_entity.getCandidate_email());
				candidate_mail_list.add(new CandidateMailResponse(candidate_entity.getCandidate_id(),
						candidate_entity.getCandidate_email()));
				sent_status = "SUCCESS";
			} else {
				sent_status = "FAILURE";
			}
			CandidateMail cand_mail_obj = candidate_mail_repo.save(new CandidateMail(strDate, sent_status, "ACTIVE"));
			candidate_mail_repo.updateCandidateMail(candidate_entity.getCandidate_id(),
					cand_mail_obj.getCandidate_mail_id());
		}
		int status_chk = MailServer.sendFromGMail(MailServer.USER_NAME, MailServer.PASSWORD, candidate_mail,
				MailServer.SUBJECT_NAME, MailServer.BODY);
		if (status_chk == 1) {

		} else if (status_chk == 0) {

		} else {

		}
		return candidate_mail_list;
	}

	public int sendCandidateMailStatus(CandidateEntity candidate) {
		List<String> candidate_mail = new ArrayList<String>();

		String candmsg = "Congratulation ".concat(candidate.getCandidate_name()).concat(" , \n") + "\n"
				+ "You had successfully visited the Survey page and your responses are very Good.......\r\n" + "\n"
				+ "Candidate Details: \n" + "-------------------------------\r\n"
				+ "Name: ".concat(candidate.getCandidate_name()).concat("\n")
				+ "Mail ID: ".concat(candidate.getCandidate_email()).concat("\n")
				+ "Opening Time: ".concat(candidate.getOpen_time()).concat("\n")
				+ "Closing Time: ".concat(candidate.getClose_time()).concat("\n")
				+ "Response Date (mm/dd/yyyy): ".concat(candidate.getResponse_date()).concat("\n") + "\n"
				+ "Thanks for visiting the survey.\r\n" + "\r\n" + "Regards\r\n" + "Survey Team ";
		String candsubject = "Regarding Survey Confirmation";

		candidate_mail.add(candidate.getCandidate_email());

		MailServer.sendFromGMail(MailServer.USER_NAME, MailServer.PASSWORD, candidate_mail, candsubject, candmsg);
		return 1;
	}
}
