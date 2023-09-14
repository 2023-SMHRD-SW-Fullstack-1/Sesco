package com.smhrd.sesco.service;

import java.net.http.HttpHeaders;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.smhrd.sesco.domain.Kid;
import com.smhrd.sesco.domain.Member;
import com.smhrd.sesco.mapper.KidMapper;
import com.smhrd.sesco.mapper.MemberMapper;

@Service
public class KidService {

	@Autowired
	private KidMapper mapper;

//	회원ID -> 아이정보List추출
	public ArrayList<Kid> getKidList(String user_id){
		return mapper.getKidList(user_id);
	}

	// 아이프로필 등록
	public Kid KidRegister(Kid kid) {
		mapper.KidRegister(kid);
		return kid;
	}

	public void KidUpdate(Kid kid) {
		mapper.KidUpdate(kid);
	}
	

}