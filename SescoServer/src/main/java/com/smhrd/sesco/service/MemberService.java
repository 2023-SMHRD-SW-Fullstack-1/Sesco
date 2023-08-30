package com.smhrd.sesco.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.smhrd.sesco.domain.Member;
import com.smhrd.sesco.mapper.MemberMapper;

@Service
public class MemberService {

   @Autowired
   private MemberMapper memberMapper;

   // 회원가입
   public void join(Member member) {
      memberMapper.join(member);
   }

   // id중복체크
   public int id_Check(String userId) {
      
      return memberMapper.id_Check(userId);
      
   }

}