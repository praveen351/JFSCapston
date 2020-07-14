package com.jfs.capston.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jfs.capston.model.SurveyDetailEntity;

@Repository
public interface SurveyDetailRepository extends JpaRepository<SurveyDetailEntity, Long> {
	@Transactional
	@Modifying
	@Query(value = "update Survey_Detail set sdrenid=:sdrenid , sseid=:sseid where survey_detail_id=:survey_detail_id", nativeQuery = true)
	int updateSurveyDetail(@Param("sdrenid") long responset, @Param("sseid") long survey_id,
			@Param("survey_detail_id") long survey_detail_id);
	
	@Transactional
	@Modifying
	@Query(value = "update Survey_Detail set status='DEAD' where survey_detail_id=:survey_detail_id", nativeQuery = true)
	int deleteSurveyDetail(@Param("survey_detail_id") long survey_detail_id);
	
	@Query(value = "SELECT * FROM Survey_Detail where status='ACTIVE' and sseid=:survey_id", nativeQuery = true)
	List<SurveyDetailEntity> findAllSurveyDetail(@Param("survey_id") long survey_id);
	
}
