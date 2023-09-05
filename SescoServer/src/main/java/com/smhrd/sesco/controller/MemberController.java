package com.smhrd.sesco.controller;

import java.util.Map;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.sesco.domain.Member;
import com.smhrd.sesco.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000") 
public class MemberController {

	@Autowired
	private MemberService memberService;
	

	// 기존회원 가입
	@PostMapping(value = "/join")
	public String join(@RequestBody Map<String, Object> map) {

		String user_id = map.get("user_id").toString();
		String user_pw = map.get("user_pw").toString();
		String user_nick = map.get("user_nick").toString();
		String user_name = map.get("user_name").toString();
		String user_email = map.get("user_email").toString();

		Member member = new Member(user_id, user_pw, user_nick, user_name, user_email);

		// id 중복체크 , 닉네임 중복체크
		int id_Check = memberService.id_Check(user_id);
		int nick_Check = memberService.nick_Check(user_nick);
		int email_Check = memberService.email_Check(user_email);
		
		if (id_Check == 1) {// id 중복 O 
			return "id중복";
		} else if(nick_Check==1){ // 닉네임 중복 O
			return "nick중복";
		} else if(email_Check==1) {
			return "email중복";
		} else { // id 중복 X , 닉네임 중복 X , 이메일 중복 X
			 memberService.join(member);
			 return "success";
		}
	}

	// 기존회원 로그인
	@PostMapping(value = "/login")
	public JSONObject login(@RequestBody Map<String, Object> map) {

		String user_id = map.get("user_id").toString();
		String user_pw = map.get("user_pw").toString();

		int result = memberService.userSelect(user_id, user_pw);
		JSONObject obj = new JSONObject();
		if (result == 1) { // 로그인 성공
			Member member = memberService.login(user_id, user_pw);
			obj.put("loginUser", member);
			return obj;
		} else { // 로그인 실패
			return obj;
		}
	}

	// 회원정보수정
	@PostMapping(value = "/update")
	public JSONObject update(@RequestBody Map<String, Object> map) {
		System.out.println(map);

		String user_id = map.get("user_id").toString();
		String user_pw = map.get("user_pw").toString();
		String user_nick = map.get("user_nick").toString();
		Member member = new Member(user_id, user_pw, user_nick);
		memberService.update(member);
		JSONObject obj = new JSONObject();
		obj.put("loginUser", member);
		// System.out.println("update obj : "+obj);

		return obj;

	}

	// 기존회원 탈퇴
	@PostMapping("/delete")
	public void delete(@RequestBody Map<String, Object> map) {
		String user_id = map.get("user_id").toString();
		memberService.delete(user_id);

	}
	

}