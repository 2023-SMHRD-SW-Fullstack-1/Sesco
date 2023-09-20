package com.smhrd.sesco.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.smhrd.sesco.service.DiaryService;

@RestController 
@CrossOrigin(origins = "http://localhost:3000")
public class KakaoController {
	
	@Autowired
	private DiaryService diaryService;
	
	@GetMapping("/login/oauth2/callback/kakao")
	public @ResponseBody String kakaoCallback(String code) {
		
		//POST방식으로 key : value 데이터를 요청 (카카오쪽으로)

		RestTemplate rt = new RestTemplate();
		
		//HttpHeader 오브젝트 생성
		HttpHeaders headers = new HttpHeaders();
		headers.add("COntent-type", "application/x-www-form-urlencoded;charset=utf-8");
		
		//HttpBody 오브젝트 생성
		MultiValueMap<String,String> params = new LinkedMultiValueMap();
		params.add("grant-type","authorization_code" );
		params.add("client_id","a3c0f888d3612163b725374cf8c09dd1" );
		params.add("redirect_uri","http://localhost:3000/login/oauth2/callback/kakao" );
		params.add("code", code);
		
		//HttpHeader와 HttpBody를 하나의 오브젝트에 담기
		HttpEntity<MultiValueMap<String,String>> kakaoTokenRequest = 
				new HttpEntity<>(params,headers);
		
		//Http 요청하기 - Post방식으로 -그리고 response 변수의 응답 받음.
		ResponseEntity<String> response = rt.exchange(
			" https://kauth.kakao.com/oauth/token",
			HttpMethod.POST,
			kakaoTokenRequest,
			String.class
		);
				
		return "카카오 인증 성공";
	}

}
