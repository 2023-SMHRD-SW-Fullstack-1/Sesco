package com.smhrd.sesco.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.sesco.service.GoogleService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value = "/login/oauth2", produces = "application/json")
public class GoogleController {

	@Autowired
	private GoogleService googleService;

	// 구글 계정선택페이지
//	@GetMapping("/login/google/redirect")
//	public RedirectView redirectToGoogle() {
//		String url = "https://accounts.google.com/o/oauth2/v2/auth?client_id=339476817297-767npjjvgs7de9rejg4fao170u7sn78h.apps.googleusercontent.com&redirect_uri=http://localhost:8081/sesco/login/google&response_type=code&scope=email%20profile";
//		System.out.println("googleRedirect");
//		return new RedirectView(url);
//		}

	// 구글 로그인
//	@GetMapping("/login/google")
//	public void googleLogin(@RequestParam String code) {
//		System.out.println("googleLoginOK");
//		memberService.googleLogin(code);
//	}
//	
	// 구글 로그인
	@GetMapping("/login/google")
//	@GetMapping("/code/google")
	public ResponseEntity<Integer> googleLogin(@RequestParam String code) {
		System.out.println("googleLoginOK, code : " + code);
		int checkResult = googleService.googleLogin(code);
		return ResponseEntity.ok(checkResult);
	}

	@GetMapping("/")
	public String home() {
		return "Welcome to SESCO!";
	}

}
