package com.jfs.capston.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jfs.capston.model.ResponseTypeEntity;

@Repository
public interface ResponseTypeRepository extends JpaRepository<ResponseTypeEntity, Long> {
	@Query(value = "SELECT * FROM Response_Type where status='ACTIVE'", nativeQuery = true)
	List<ResponseTypeEntity> findAllResponseType();
}
