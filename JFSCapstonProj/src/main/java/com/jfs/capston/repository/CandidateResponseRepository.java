package com.jfs.capston.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jfs.capston.model.CandidateResponseEntity;

@Repository
public interface CandidateResponseRepository extends JpaRepository<CandidateResponseEntity, Long> {
	@Transactional
	@Modifying
	@Query(value = "update Candidate_Response set sdcreid=:sdcreid , cecdeid=:cecdeid where candidate_res_id=:candidate_res_id", nativeQuery = true)
	int updateCandidateResponse(@Param("candidate_res_id") long candidate_res_id, @Param("sdcreid") long sdcreid,
			@Param("cecdeid") long cecdeid);
}
