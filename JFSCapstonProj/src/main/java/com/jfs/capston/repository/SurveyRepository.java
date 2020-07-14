package com.jfs.capston.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jfs.capston.model.SurveyEntity;

@Repository
public interface SurveyRepository extends JpaRepository<SurveyEntity, Long> {
	@Query(value = "SELECT * FROM Survey where status='ACTIVE'", nativeQuery = true)
	List<SurveyEntity> findAllSurvey();
	
	@Transactional
	@Modifying
	@Query(value = "update Survey set status='DEAD' where surveyid=:survey_id", nativeQuery = true)
	int deleteSurvey(@Param("survey_id") long survey_id);
}
