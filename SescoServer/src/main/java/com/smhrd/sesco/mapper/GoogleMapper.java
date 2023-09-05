package com.smhrd.sesco.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.smhrd.sesco.domain.KakaoUserInfo;

@Mapper
public interface GoogleMapper {
	public void createUser(KakaoUserInfo kakaoUserInfo);
	
	public int emailCheck(@Param("email") String email);
}
