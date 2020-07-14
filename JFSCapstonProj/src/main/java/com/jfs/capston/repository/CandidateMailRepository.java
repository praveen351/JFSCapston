package com.jfs.capston.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jfs.capston.model.CandidateMail;

@Repository
public interface CandidateMailRepository extends JpaRepository<CandidateMail, Long>{
	@Query(value = "SELECT * FROM Candidate_Mail where status='ACTIVE' and cecmid=:candidate_id", nativeQuery = true)
	List<CandidateMail> findAllCandidateMail(@Param("candidate_id") long candidate_id);
	
	@Transactional
	@Modifying
	@Query(value = "update Candidate_Mail set cecmid=:candidate_id where candidate_mail_id=:candidate_mail_id", nativeQuery = true)
	int updateCandidateMail(@Param("candidate_id") long candidate_id , @Param("candidate_mail_id") long candidate_mail_id);
}
