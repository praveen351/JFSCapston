package com.jfs.capston.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jfs.capston.model.CandidateEntity;

@Repository
public interface CandidateRepository extends JpaRepository<CandidateEntity, Long> {
	@Query(value = "SELECT * FROM Candidate where status='ACTIVE' and cseid=:survey_id", nativeQuery = true)
	List<CandidateEntity> findAllCandidateResponse(@Param("survey_id") long survey_id);
	
	@Query(value = "SELECT * FROM Candidate where status='ACTIVE' and cseid=:survey_id and open_time is not null", nativeQuery = true)
	List<CandidateEntity> findAllSurveyedCandidate(@Param("survey_id") long survey_id);
	
	@Transactional
	@Modifying
	@Query(value = "update Candidate set cseid=:cseid where candidate_id=:candidate_id", nativeQuery = true)
	int updateCandidate(@Param("cseid") long cseid, @Param("candidate_id") long candidate_id);

	@Transactional
	@Modifying
	@Query(value = "update Candidate set status='DEAD' where candidate_id=:candidate_id", nativeQuery = true)
	int deleteCandidate(@Param("candidate_id") long candidate_id);

	@Query(value = "SELECT cseid FROM Candidate where candidate_email=:candidate_email and candidate_name=:candidate_name", nativeQuery = true)
	Object fetchCandidate_surveyID(@Param("candidate_email") String candidate_email,
			@Param("candidate_name") String candidate_name);

	@Query(value = "SELECT * FROM Candidate where candidate_email=:candidate_email and candidate_name=:candidate_name", nativeQuery = true)
	CandidateEntity fetchCandidate_ID(@Param("candidate_email") String candidate_email,
			@Param("candidate_name") String candidate_name);

	@Transactional
	@Modifying
	@Query(value = "update Candidate set open_time=:open_time,close_time=:close_time,response_date=:response_date where candidate_id=:candidate_id", nativeQuery = true)
	int updateCandidate(@Param("candidate_id") long candidate_id, @Param("open_time") String open_time,
			@Param("close_time") String close_time, @Param("response_date") String response_date);
}
