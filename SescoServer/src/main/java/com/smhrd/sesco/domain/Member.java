package com.smhrd.sesco.domain;

import lombok.Data;

@Data
public class Member {

	private String user_id;
	private String user_pw;
	private String user_nick;
	private String user_name;
	private String user_email;

	public Member(String user_id, String user_pw, String user_nick, String user_name, String user_email) {

	}

	public Member(String user_id, String user_nick) {
		
	}

}