package com.jfs.capston;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.jfs.capston.model.ResponseTypeEntity;
import com.jfs.capston.service.ResponseTypeService;

@Configuration
public class CapstonConfig {

	@Autowired
	ResponseTypeService repo_service;

	@Bean
	void insertResponseTypeData() {
		List<ResponseTypeEntity> entityList = new ArrayList<>(
				Arrays.asList(new ResponseTypeEntity("DROPDOWN", "MULTIPLE", "ACTIVE"),
						new ResponseTypeEntity("TEXTBOX", "SINGLE", "ACTIVE"),
						new ResponseTypeEntity("TEXTAREA", "SINGLE", "ACTIVE"),
						new ResponseTypeEntity("RADIOBUTTON", "MULTIPLE", "ACTIVE"),
						new ResponseTypeEntity("CHECKBOX", "MULTIPLE", "ACTIVE")));
		for (ResponseTypeEntity responseTypeEntity : entityList) {
			repo_service.saveResponseTypeEntity(responseTypeEntity);
		}
	}
}
