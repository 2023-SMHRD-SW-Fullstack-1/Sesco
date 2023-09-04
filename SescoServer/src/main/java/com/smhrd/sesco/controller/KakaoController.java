package com.smhrd.sesco.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.smhrd.sesco.domain.KakaoUserInfo;
import com.smhrd.sesco.service.KakaoService;

import java.util.logging.Logger;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;


@CrossOrigin
@RestController
@RequestMapping("${api.path.uri}")
@RequiredArgsConstructor
public class KakaoController {

	private final Logger log = Logger.getLogger(KakaoController.class.getName());

    @Autowired
    private KakaoService kakaoAPI;

    @GetMapping("/test")
    public String Hello(){
        return "Test Working";
    }
    
    @GetMapping(path="/kakaoLogin")
    public ResponseEntity<String> login(@RequestParam("code") String code, Model model) {
    	System.out.println("통신성공");
        log.info("Authorization Code is " + code);
        String accessToken = kakaoAPI.getAccessToken(code);      
        KakaoUserInfo kakaoUserInfo = null;
        if (accessToken != null && !accessToken.isEmpty()) {
            kakaoUserInfo = kakaoAPI.getUserInfo(accessToken);
            if (kakaoUserInfo != null) {
            	
                return ResponseEntity.ok("controller " + "(Authorization code " + code + " )");
            }
        }
        
        model.addAttribute("kakaoUserInfo", kakaoUserInfo);
        return ResponseEntity.badRequest().body("Login failed!");
    }
    
    @GetMapping(path="/getKakaoUserInfo")
    public ResponseEntity<KakaoUserInfo> getKakaoUserInfo(@RequestParam String accessToken) {
        KakaoUserInfo userInfo = kakaoAPI.getUserInfo(accessToken);
        return ResponseEntity.ok(userInfo);
    }
}
