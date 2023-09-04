package com.smhrd.sesco.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.smhrd.sesco.domain.Member;
import com.smhrd.sesco.mapper.MemberMapper;

@Service
public class MemberService {

	@Autowired
	private MemberMapper memberMapper;

	// 기존회원 가입
	public void join(Member member) {
		memberMapper.join(member);
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
	public Member login(String user_id, String user_pw) {
		return memberMapper.login(user_id, user_pw);
	}

	// 회원정보수정
	public void update(Member member) {
		memberMapper.update(member);
	}

	// 기존회원탈퇴
	public void delete(String user_id) {
		memberMapper.delete(user_id);
	}


}