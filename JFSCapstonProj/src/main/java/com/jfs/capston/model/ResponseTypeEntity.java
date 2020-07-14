package com.jfs.capston.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Check;

@Entity
@Table(name = "ResponseType")
@Check(constraints = "response_type IN ('DROPDOWN','TEXTBOX','TEXTAREA','RADIOBUTTON','CHECKBOX') AND response_scope IN ('SINGLE','MULTIPLE','ANY') AND status IN ('ACTIVE','DEAD')")
@SequenceGenerator(name = "response_type_seq", initialValue = 1)
public class ResponseTypeEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "response_type_seq")
	@Column(name = "response_type_id")
	private long response_type_id;

	@Column(name = "response_type", unique = true)
	private String response_type;

	@Column(name = "response_scope")
	private String response_scope;

	@Column(name = "status")
	private String status;

	public ResponseTypeEntity(String response_type, String response_scope, String status) {
		super();
		this.response_type = response_type;
		this.response_scope = response_scope;
		this.status = status;
	}
	
	public ResponseTypeEntity() {
		super();
	}

	public long getResponse_type_id() {
		return response_type_id;
	}

	public void setResponse_type_id(long response_type_id) {
		this.response_type_id = response_type_id;
	}

	public String getResponse_type() {
		return response_type;
	}

	public void setResponse_type(String response_type) {
		this.response_type = response_type;
	}

	public String getResponse_scope() {
		return response_scope;
	}

	public void setResponse_scope(String response_scope) {
		this.response_scope = response_scope;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}