package com.jfs.capston.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jfs.capston.model.CandidateEntity;
import com.jfs.capston.model.CandidateMail;
import com.jfs.capston.model.CandidateResponseEntity;
import com.jfs.capston.model.SurveyEntity;
import com.jfs.capston.repository.CandidateRepository;
import com.jfs.capston.repository.CandidateResponseRepository;
import com.jfs.capston.repository.SurveyRepository;

@Service
public class CandidateService {
	private CandidateRepository candidate_repo;
	private SurveyRepository survey_repo;
	private CandidateResponseRepository candidate_resp_repo;

	@Autowired
	public CandidateService(CandidateRepository candidate_repo, SurveyRepository survey_repo,
			CandidateResponseRepository candidate_resp_repo) {
		this.candidate_repo = candidate_repo;
		this.survey_repo = survey_repo;
		this.candidate_resp_repo = candidate_resp_repo;
	}

	public SurveyEntity addCandidate(SurveyEntity survey) {
		long survey_id = survey.getSurveyid();
		List<CandidateEntity> seDetailList = survey.getCandidate_list();
		for (CandidateEntity candidateEntity : seDetailList) {
			CandidateEntity centity = candidate_repo.save(candidateEntity);
			candidate_repo.updateCandidate(survey_id, centity.getCandidate_id());
		}
		return survey_repo.getOne(survey_id);
	}

	public int deleteCandidate(long candidate_id) {
		return candidate_repo.deleteCandidate(candidate_id);
	}

	public long getCandidate_Survey(String candidate_email, String candidate_name) {
		Object osurvey_id = candidate_repo.fetchCandidate_surveyID(candidate_email, candidate_name);
		if (osurvey_id != null) {
			long survey_id = Long.parseLong(osurvey_id.toString());
			return survey_id;
		}
		return 0;
	}

	public long getCandidate_Survey_Visited(String candidate_email, String candidate_name) {
		CandidateEntity candidate_obj = candidate_repo.fetchCandidate_ID(candidate_email, candidate_name);
		if (candidate_obj != null && candidate_obj.getOpen_time() == null) {
			return 1;
		}
		return 0;
	}

	public long validateDate(long survey_id) {
		SurveyEntity sentity = survey_repo.findById(survey_id).get();
		try {
			String opendate = sentity.getOpening_date_time().split("@")[0];
			String opentime = sentity.getOpening_date_time().split("@")[1];

			String clendate = sentity.getClosing_date_time().split("@")[0];
			String clentime = sentity.getClosing_date_time().split("@")[1];

			Date date = Calendar.getInstance().getTime();

			SimpleDateFormat sopdate = new SimpleDateFormat("MM/dd/yyyy hh:mm aa");
			Date opdate = sopdate.parse(opendate.concat(" ").concat(opentime));
			SimpleDateFormat scldate = new SimpleDateFormat("MM/dd/yyyy hh:mm aa");
			Date cldate = scldate.parse(clendate.concat(" ").concat(clentime));

			if (date.compareTo(opdate) >= 0 && date.compareTo(cldate) <= 0) {
				return 1;
			}

		} catch (Exception e) {
			return 0;
		}

		return 0;
	}

	public long getCandidate_SurveyMailConf(String candidate_email, String candidate_name) {
		CandidateEntity candidate_obj = candidate_repo.fetchCandidate_ID(candidate_email, candidate_name);
		if (candidate_obj != null) {
			for (CandidateMail cobj : candidate_obj.getCandidate_mail_list())
				if (cobj.getStatus().equals("ACTIVE") && cobj.getSent_status().equals("SUCCESS"))
					return 1;
			return 0;
		} else {
			return 0;
		}
	}

	public long getCandidate_ID(String candidate_email, String candidate_name) {
		CandidateEntity candidate_obj = candidate_repo.fetchCandidate_ID(candidate_email, candidate_name);
		if (candidate_obj != null) {
			long candidate_id = candidate_obj.getCandidate_id();
			return candidate_id;
		}
		return 0;
	}

	public int updateCandidate(CandidateEntity candobj) {
		Date date = Calendar.getInstance().getTime();
		DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
		String strDate = dateFormat.format(date);

		int upStatus = candidate_repo.updateCandidate(candobj.getCandidate_id(), candobj.getOpen_time(),
				candobj.getClose_time(), strDate);
		if (upStatus != 0) {
			int rescount = 0;
			List<CandidateResponseEntity> candidate_response_list_temp = candobj.getCandidate_response_list();
			for (int i = 0; i < candidate_response_list_temp.size(); i++) {
				long sdentity_id = candidate_response_list_temp.get(i).getSurveydetailentity().getSurvey_detail_id();
				CandidateResponseEntity crtentity = candidate_response_list_temp.get(i);
				crtentity.setSurveydetailentity(null);
				candidate_resp_repo.save(crtentity);
				int ucresponse = candidate_resp_repo.updateCandidateResponse(crtentity.getCandidate_res_id(),
						sdentity_id, candobj.getCandidate_id());
				if (ucresponse != 0)
					rescount++;
			}
			if (candidate_response_list_temp.size() == rescount) {
				return 1;
			} else {
				return 0;
			}
		}
		return -1;
	}

	public Map<String, List<CandidateEntity>> getCandidateData(long survey_id) {
		List<CandidateEntity> celist = candidate_repo.findAllCandidateResponse(survey_id);

		List<CandidateEntity> acelistfilter = new ArrayList<CandidateEntity>();
		List<CandidateEntity> dcelistfilter = new ArrayList<CandidateEntity>();
		List<CandidateEntity> ucelistfilter = new ArrayList<CandidateEntity>();

		Map<String, List<CandidateEntity>> mapData = new HashMap<String, List<CandidateEntity>>();

		for (CandidateEntity candidateEntity : celist) {
			for (CandidateMail candidatemailEntity : candidateEntity.getCandidate_mail_list()) {
				if (candidatemailEntity.getStatus().equals("ACTIVE")
						&& candidatemailEntity.getSent_status().equals("SUCCESS")) {
					if (candidateEntity.getClose_time() != null)
						acelistfilter.add(candidateEntity);
					else
						dcelistfilter.add(candidateEntity);
				} else
					ucelistfilter.add(candidateEntity);
			}
			if (candidateEntity.getCandidate_mail_list().size() == 0)
				ucelistfilter.add(candidateEntity);
		}

		mapData.put("covcandidate", acelistfilter);
		mapData.put("ntacandidate", dcelistfilter);
		mapData.put("inacandidate", ucelistfilter);

		return mapData;
	}

	public CandidateEntity getSpecCandidate(long cand_id) {
		return candidate_repo.getOne(cand_id);
	}
}
