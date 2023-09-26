  package com.smhrd.sesco.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.util.Chars;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
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
		} else if (nick_Check == 1) { // 닉네임 중복 O
			return "nick중복";
		} else if (email_Check == 1) { // 이메일중복 O
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
		System.out.println("id:" + user_id);
		String user_pw = map.get("user_pw").toString();
		System.out.println("pw:" + user_pw);

		int result = memberService.userSelect(user_id, user_pw);
		System.out.println("result 값 : " + result);
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

	// 아이디 찾기
	@PostMapping(value = "member/searchid")
	public String SearchId(@RequestBody Member member) {
		System.out.println("진입");
		return memberService.SearchId(member);
	}

	//비밀번호 찾기
	@PostMapping(value = "member/searchpw")
	public String SearchPw(@RequestBody Member member) {
		return memberService.SearchPw(member);
	}
	
	// 기존회원 탈퇴
	@PostMapping("member/delete")
	public void delete(@RequestBody Map<String, Object> map) {
		String user_id = map.get("user_id").toString();
		memberService.MemberDelete(user_id);

	}

	// 구글로그인
	@PostMapping("/member/googlelogin")
    public JSONObject GoogleSignin(@RequestBody Map<String, Object> map) {
		
        // JWT 데이터 추출
        String jwtData = map.get("res").toString();
        String[] payload = jwtData.split("\\.");
        String value = payload[1];     
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String decodedPayload = new String(decoder.decode(value));
        
        // JSON 파싱
        org.json.JSONObject jsonObject = new org.json.JSONObject(decodedPayload);
        String user_id = jsonObject.getString("email");
        String user_name = jsonObject.getString("name");
        //String login_type = map.get("login_type").toString();
        
        
        // Member 객체 저장
        Member member = new Member();
        member.setUser_id(user_id);
        member.setUser_name(user_name);
        //member.setLogin_type(login_type);
        
        // 회원가입 여부 판단
        int googleCheck = memberService.GoogleUserCheck(member);
        
        JSONObject Object = new JSONObject();
        if(googleCheck>0) { // 가입된 회원
        	memberService.GoogleLogin(member);
        	Object.put("Member", member);
        	System.out.println("로그인성공" + Object );
        	return Object;
        }else { // 미가입된 유저
        	Object.put("Member", null);
        	System.out.println("로그인실패"+Object);
        	return Object;
        }
        
        
        
        // 1. 아이디와 이름 있는지 확인 where 로그인형태 G
        // 2. 있으면 정보 반환 -> 로그인성공 // 없으면 닉네임요청 -> 회원가입 이메일 , 닉네임 , 이름
		
    }
	
	// 구글 회원가입
	@PostMapping("/member/googlejoin")
	public JSONObject GoogleJoin(@RequestBody Map<String, Object> map) {
	    
	        // JWT 데이터 추출
	        String jwtData = map.get("res").toString();
	        String[] payload = jwtData.split("\\.");
	        String value = payload[1];     
	        Base64.Decoder decoder = Base64.getUrlDecoder();
	        String decodedPayload = new String(decoder.decode(value));
	        
	        // JSON 파싱
	        org.json.JSONObject jsonObject = new org.json.JSONObject(decodedPayload);
	        String user_id = jsonObject.getString("email");
	        String user_name = jsonObject.getString("name");
	        String user_nick = map.get("user_nick").toString();
	        
	        // Member 객체 저장
	        Member member = new Member();
	        member.setUser_id(user_id);
	        member.setUser_name(user_name);
	        member.setUser_nick(user_nick);
	             
	        // 닉네임 중복판별
	        int nick_Check = memberService.nick_Check(user_nick);
	        
	        JSONObject Object = new JSONObject();
	        if(nick_Check==0) { 
	        	memberService.GoogleJoin(member);
	        	Object.put("Member", member);
	        	System.out.println("로그인성공" + Object );
	        	return Object;
	        }else {
	        	Object.put("Member", null);
	        	System.out.println("로그인실패"+Object);
	        	return Object;
	        }
	    
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	// 이제 디코딩된 데이터를 파싱하고 필요한 작업을 수행할 수 있습니다.
			// 파싱 예시:
			// 
			// JSONObject json = (JSONObject) parser.parse(decodedData);
			// String clientId = (String) json.get("clientId");
			// 등등...
	
	
	
	
	
	
	

}