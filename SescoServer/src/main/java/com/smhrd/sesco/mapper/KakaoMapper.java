package com.smhrd.sesco.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.sesco.domain.KakaoUserInfo;

@Mapper
public interface KakaoMapper {


	public void CreateUser(KakaoUserInfo kakaoUserInfo);
}
