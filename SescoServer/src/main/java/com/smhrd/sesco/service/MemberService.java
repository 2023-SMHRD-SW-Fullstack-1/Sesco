package com.smhrd.sesco.service;

import java.net.http.HttpHeaders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.smhrd.sesco.domain.Member;
import com.smhrd.sesco.mapper.MemberMapper;

@Service
public class MemberService {

	@Autowired
	private MemberMapper memberMapper;

	// 기존회원 가입
	public void MemberJoin(Member member) {
		memberMapper.MemberJoin(member);
	}

	// id 중복체크
	public int id_Check(String user_id) {
		return memberMapper.id_Check(user_id);
	}

	// 닉네임 중복체크
	public int nick_Check(String user_nick) {
		return memberMapper.nick_Check(user_nick);
	}
	
	// 이메일 중복체크
	public int email_Check(String user_email) {
		return memberMapper.email_Check(user_email);
	}

	// 가입여부조회
	public int userSelect(String user_id, String user_pw) {
		return memberMapper.userSelect(user_id, user_pw);
	}

	// 기존회원 로그인
	public Member MemberLogin(String user_id, String user_pw) {
		return memberMapper.MemberLogin(user_id, user_pw);
	}

	// 아이디 찾기
	public String SearchId(Member member) {
		return memberMapper.SearchId(member);
	}

	// 기존회원탈퇴
	public void MemberDelete(String user_id) {
		memberMapper.MemberDelete(user_id);
	}

	// 구글 회원가입 여부
	public int GoogleUserCheck(Member member) {
		
		return memberMapper.GoogleUserCheck(member);
	}
	
	//구글 로그인
	public Member GoogleLogin(Member member) {
		return memberMapper.GoogleLogin(member);
	}


	public Member kakaoCallback(Member member) {
		return memberMapper.kakaoCallback(member);
	}
	// 구글 회원가입
	public void GoogleJoin(Member member) {
		
		memberMapper.GoogleJoin(member);

	}

	//비밀번호 찾기
	public String SearchPw(Member member) {
		return (String) memberMapper.SearchPw(member);
	}
	
	

}