package com.smhrd.sesco.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.sesco.domain.Member;
import com.smhrd.sesco.service.MemberService;

@RestController
@CrossOrigin("http://localhost:3000")
public class MemberController {

   @Autowired
   private MemberService memberService;
   
   //회원가입
   @PostMapping(value = "/join")
   public boolean join(@RequestBody Map<String, Object> map) {
      System.out.println("회원가입map : "+map);
      String userId = map.get("user_id").toString();
      String userPw = map.get("user_pw").toString();
      String userNick = map.get("user_nick").toString();
      String userName = map.get("user_name").toString();
      String userEmail = map.get("user_email").toString();

      Member member = new Member(userId,userPw,userNick,userName,userEmail);
      
      // id 중복체크
      int result = memberService.id_Check(userId);
      if (result == 1) {// id 중복 O
         return false;
      } else { // id 중복 X
         memberService.join(member);
         return true;
      }
   }
   
   //로그인
   @PostMapping("/login")
   public void login() {
      
   }
   
}