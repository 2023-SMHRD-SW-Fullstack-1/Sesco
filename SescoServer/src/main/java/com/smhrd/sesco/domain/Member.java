package com.smhrd.sesco.domain;

import lombok.Data;

@Data
public class Member {
   
   private String user_id;
   private String user_pw;
   private String user_nick;
   private String user_name;
   private String user_email;
   
   public Member(String userId, String userPw, String userNick, String userName, String userEmail) {
      
   }
   
}