package com.smhrd.sesco.domain;

import lombok.Builder;
import lombok.Data;

@Data
public class KakaoUserInfo {

	String email;
    String id;
    String nickname;
    
    @Builder
    public KakaoUserInfo(String email, String id, String nickname) {
    	this.email = email;
        this.id = id;
        this.nickname = nickname;
    }
}
