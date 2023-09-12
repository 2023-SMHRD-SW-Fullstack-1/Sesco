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
	@PostMapping(value = "member/join")
	public String MemberJoin(@RequestBody Map<String, Object> map) {

		String user_id = map.get("user_id").toString();
		
		System.out.println(user_id);
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
		} else if(email_Check==1) { // 이메일중복 O
			return "email중복";
		} else { // id 중복 X , 닉네임 중복 X , 이메일 중복 X
			 memberService.MemberJoin(member);
			 return "success";
		}
	}

	// 기존회원 로그인
	@PostMapping(value = "member/login")
	public JSONObject MemberLogin(@RequestBody Map<String, Object> map) {

		String user_id = map.get("user_id").toString();
		System.out.println("id:"+user_id);
		String user_pw = map.get("user_pw").toString();
		System.out.println("pw:"+user_pw);

		int result = memberService.userSelect(user_id, user_pw);
		System.out.println("result 값 : "+result);
		JSONObject obj = new JSONObject();
		if (result == 1) { // 로그인 성공
			System.out.println("로그인성공");
			Member member = memberService.MemberLogin(user_id, user_pw);
			obj.put("loginUser", member);
			return obj;
		} else { // 로그인 실패
			System.out.println("로그인실패");
			return obj;
		}
	}

	// 회원정보수정
	@PostMapping(value = "member/update")
	public JSONObject MemberUpdate(@RequestBody Map<String, Object> map) {
		System.out.println(map);

		String user_id = map.get("user_id").toString();
		String user_pw = map.get("user_pw").toString();
		String user_nick = map.get("user_nick").toString();
		Member member = new Member(user_id, user_pw, user_nick);
		memberService.MemberUpdate(member);
		JSONObject obj = new JSONObject();
		obj.put("loginUser", member);
		// System.out.println("update obj : "+obj);

		return obj;

	}

	// 기존회원 탈퇴
	@PostMapping("member/delete")
	public void delete(@RequestBody Map<String, Object> map) {
		String user_id = map.get("user_id").toString();
		memberService.MemberDelete(user_id);

	}
	

}