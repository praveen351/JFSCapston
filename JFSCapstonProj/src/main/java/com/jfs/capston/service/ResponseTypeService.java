package com.jfs.capston.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jfs.capston.model.ResponseTypeEntity;
import com.jfs.capston.repository.ResponseTypeRepository;

@Service
public class ResponseTypeService {
	private ResponseTypeRepository response_type_repo;

	@Autowired
	public ResponseTypeService(ResponseTypeRepository response_type_repo) {
		this.response_type_repo = response_type_repo;
	}

	public ResponseTypeEntity saveResponseTypeEntity(ResponseTypeEntity response_type) {
		ResponseTypeEntity response_type_data = response_type_repo.save(response_type);
		return response_type_data;
	}

	public List<ResponseTypeEntity> getResponseTypeList() {
		List<ResponseTypeEntity> response_type_List = response_type_repo.findAllResponseType();
		return response_type_List;
	}
	
	public ResponseTypeEntity getResponseType(long response_type_id) {
		Optional<ResponseTypeEntity> response_type = response_type_repo.findById(response_type_id);
		return response_type.get();
	}
}
