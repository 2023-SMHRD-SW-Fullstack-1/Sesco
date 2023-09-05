package com.smhrd.sesco.service;

import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smhrd.sesco.mapper.GoogleMapper;

@Service
public class GoogleService {

    private final Environment env;
    private final RestTemplate restTemplate = new RestTemplate();
    private GoogleMapper googleMapper;

    public GoogleService(Environment env, GoogleMapper googleMapper) {
        this.env = env;
        this.googleMapper = googleMapper;
    }

    //구글 로그인 
 // 구글 로그인
// 	public void googleLogin(String code) {
// 		 System.out.println("GoogleCode : " + code);
// 		 String googleAccessToken = getGoogleToken(code);
// 		 JsonNode userResourceNode = getUserInfo(googleAccessToken, "google");
// 	        
// 	        String id = userResourceNode.get("id").asText();
// 	        String email = userResourceNode.get("email").asText();
// 	        String nickname = userResourceNode.get("name").asText();
// 	        
// 	        System.out.println("google id: " + id);
// 	        System.out.println("google email: " + email);
// 	        System.out.println("google nickname: " + nickname);
// 	        
// 	        // DB에서 이메일 값으로 사용자 조회
// 	        int emailCheckGoogle = memberMapper.email_Check(email);     
// 		 
// 	}
 	// 구글 로그인
 	public int googleLogin(String code) {
 	    System.out.println("GoogleCode : " + code);
 	    String googleAccessToken = getGoogleToken(code);
 	    JsonNode userResourceNode = getUserInfo(googleAccessToken, "google");
 	    
 	    String id = userResourceNode.get("id").asText();
 	    String email = userResourceNode.get("email").asText();
 	    String nickname = userResourceNode.get("name").asText();
 	    
 	    System.out.println("google id: " + id);
 	    System.out.println("google email: " + email);
 	    System.out.println("google nickname: " + nickname);
 	    
 	    // DB에서 이메일 값으로 사용자 조회
 	    int checkResult = googleMapper.emailCheck(email);
 	    System.out.println("Google Email check 결과: " + String.valueOf(checkResult));
 	   return checkResult;
 	   
 	}

 	
 	
 	//구글 로그인 성공시 토큰 발급받기
 	private String getGoogleToken(String code) {
 		try {
 			
 			MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();

 			parameters.add("code", code);
 			parameters.add("client_id", env.getProperty("oauth2.google.client-id"));
 			parameters.add("client_secret", env.getProperty("oauth2.google.client-secret"));
 			parameters.add("redirect_uri", env.getProperty("oauth2.google.redirect-uri"));
 			parameters.add("grant_type", "authorization_code");
 			
 			HttpHeaders headers = new HttpHeaders();
 			headers.setContentType(org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED);

 			HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(parameters, headers);
 			ResponseEntity<String> response = restTemplate.exchange(
 		
 				env.getProperty("oauth2.google.token-uri"),
 				HttpMethod.POST,
 				request,
 				String.class	
 				);
 				System.out.println("Response status code: " + response.getStatusCode());
 				System.out.println("GoogleToken:"+response.getBody());
 				
 				//JSON 문자열 과 java 객체 변환
 			    ObjectMapper objectMapper = new ObjectMapper();
 			    JsonNode node;
 			    try {
 			    	 //응답하는 JSON을 JsonNode객체로 변환
 			         node = objectMapper.readTree(response.getBody());
 			         //JsonNode get메서드로 access_token 필드값 가져와 Text(문자열)로 변환
 			         System.out.println("access_token Text로 변환값 : "+node.get("access_token").asText().toString());
 			         return node.get("access_token").asText();
 			         
 			       } catch (JsonProcessingException e) {
 			          e.printStackTrace();
 			           return null;
 			       }
 			}catch(Exception e) {
 				e.printStackTrace();
 			}
 		return null;
 	}
 		
 	  //googleAccessToken 이용하여 Google API 서버로부터 유저 프로필 정보 가져오기
 	  private JsonNode getUserInfo(String accessToken, String registrationId) {
 	      HttpHeaders headers = new HttpHeaders();
 	      headers.setBearerAuth(accessToken);

 	      HttpEntity<?> entity = new HttpEntity<>(headers);

 	      ResponseEntity<JsonNode> response =
 	          restTemplate.exchange(
 	              env.getProperty("oauth2." + registrationId + ".resource-uri"),
 	              HttpMethod.GET,
 	              entity,
 	              JsonNode.class
 	          );
 	      return response.getBody(); 
 	  }
 	 
}
