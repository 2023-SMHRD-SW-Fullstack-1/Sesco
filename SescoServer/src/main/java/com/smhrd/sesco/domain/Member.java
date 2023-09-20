package com.smhrd.sesco.domain;

import org.apache.logging.log4j.util.Chars;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Member {

	private String user_id;
	private String user_pw;
	private String user_nick;
	private String user_name;
	private String user_email;
	private String login_type;

	public Member(String user_id, String user_pw) {
		this.user_id=user_id;
		this.user_pw=user_pw;
	}
	
	public Member(String user_id,String user_pw ,String user_nick) {
		this.user_id=user_id;
		this.user_pw=user_pw;
		this.user_nick=user_nick;
	}

	public Member(String user_id, String user_pw, String user_nick, String user_name, String user_email) {
		this.user_id=user_id;
		this.user_pw=user_pw;
		this.user_nick=user_nick;
		this.user_name=user_name;
		this.user_email=user_email;
	}

}