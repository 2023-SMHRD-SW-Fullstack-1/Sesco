package com.smhrd.sesco.mapper;

import org.apache.ibatis.annotations.Select;

import com.smhrd.sesco.domain.Member;

public interface MemberMapper {

   // 기존회원가입
   public void join(Member member);

   // id 중복체크
   @Select("select count(*) from t_user where user_id=#{user_id} and user_delete='n'")
   public int id_Check(String userId);

}