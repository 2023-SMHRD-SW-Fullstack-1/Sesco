package com.smhrd.sesco.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.smhrd.sesco.domain.Member;
import com.smhrd.sesco.service.DiaryService;
import com.smhrd.sesco.service.MemberService;

@RestController 
@CrossOrigin(origins = "http://localhost:3000")
public class KakaoController { 
	@Autowired
	private MemberService memberService;
	
	@PostMapping("/login/kakao")
	public Member kakaoCallback(@RequestBody Map<String,Object> map) {
		System.out.println(map);
		String user_nick = map.get("nickname").toString();
		String user_email = map.get("email").toString();
		
		Member member = new Member();
		member.setUser_id(user_email);
		member.setUser_name(user_nick);
		
		int id_Check = memberService.id_Check(user_email);
		
		JSONObject Object = new JSONObject();
        if(id_Check>0) { // 가입된 회원
        	return memberService.kakaoCallback(member);
        }
        return null;
	}
	
}
