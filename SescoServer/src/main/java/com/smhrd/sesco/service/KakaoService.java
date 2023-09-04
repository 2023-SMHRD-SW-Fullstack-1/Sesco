package com.smhrd.sesco.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.smhrd.sesco.controller.KakaoController;
import com.smhrd.sesco.domain.KakaoUserInfo;
import com.smhrd.sesco.mapper.KakaoMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;
import com.nimbusds.jose.shaded.gson.JsonObject;
import com.nimbusds.jose.shaded.gson.JsonParser;


@Service
public class KakaoService {

	@Autowired
	private KakaoMapper kakaomapper;

    private final Logger log = LoggerFactory.getLogger(KakaoController.class);

    @Value("${kakao.token.url}")
    private String KAKAO_TOKEN_URL;

    @Value("${kakao.user.info.url}")
    private String KAKAO_USER_INFO_URL;

    @Value("${kakao.redirect.url}")
    private String REDIRECT_URL;

    @Value("${kakao.api.key}")
    private String KAKAO_API_KEY;
    
    @Value("${kakao.client.secret}")
    private String KAKAO_CLIENT_SECRET;
    
    

    public String getAccessToken(String authorizationCode) {

        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", "authorization_code");
        map.add("client_id", KAKAO_API_KEY);
        map.add("redirect_uri", REDIRECT_URL);
        map.add("code", authorizationCode);
        map.add("client_secret", KAKAO_CLIENT_SECRET);

        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(map, headers);

        Map<String, Object> response = restTemplate.postForObject(KAKAO_TOKEN_URL, requestEntity, HashMap.class);
//        log.info("response is {}", response);

        return response.get("access_token").toString();
    }

    public KakaoUserInfo getUserInfo(String accessToken){

        RestTemplate restTemplate = new RestTemplate();

        log.info("getUserInfo accessToken is {}", accessToken);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(headers);

        String response = restTemplate.postForObject(KAKAO_USER_INFO_URL, requestEntity, String.class);
        JsonObject rootObject = JsonParser.parseString(response).getAsJsonObject();
        JsonObject properties = rootObject.getAsJsonObject("properties");
        JsonObject accountObject = rootObject.getAsJsonObject("kakao_account");
        JsonObject accessToken1 = rootObject.getAsJsonObject("email");

        System.out.println(accessToken1);
        log.info("response is {}", response.toString());

        KakaoUserInfo kakaoUserInfo = KakaoUserInfo.builder()
        		.email(accountObject.get("email").getAsString())
                .id(rootObject.get("id").getAsString())
                .nickname(properties.get("nickname").getAsString())
                .build();
        
        kakaomapper.CreateUser(kakaoUserInfo);
        
        log.info("kakaoUserInfo is {}", kakaoUserInfo.toString());

        System.out.println("유저이메일"+KakaoUserInfo.builder().email(response));
        
        return kakaoUserInfo;

    }
}
