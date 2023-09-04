package com.smhrd.sesco.controller;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import com.smhrd.sesco.domain.KakaoUserInfo;
import com.smhrd.sesco.service.KakaoService;

import java.util.logging.Logger;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;


@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("${api.path.uri}")
@RequiredArgsConstructor
public class KakaoController {

	@Configuration
	public class CorsConfig extends WebMvcConfigurationSupport {
	    @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")
	                .allowedOrigins("http://localhost:3000")
	                .allowedMethods("GET", "POST", "PUT", "DELETE")
	                .allowedHeaders("Origin", "X-Requested-With", "Content-Type", "Accept");
	    }
	}
	
	
	private final Logger log = Logger.getLogger(KakaoController.class.getName());

    @Autowired
    private KakaoService kakaoAPI;

    @PostMapping("/test")
    public String Hello(){
    	System.out.println("KKKKK");
        return "Test Working";
    }
    
    @GetMapping(path="/sesco/kakaologin")
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
    	System.out.println("get통신");
        KakaoUserInfo userInfo = kakaoAPI.getUserInfo(accessToken);
        return ResponseEntity.ok(userInfo);
    }
}
