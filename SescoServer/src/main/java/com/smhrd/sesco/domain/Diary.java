package com.smhrd.sesco.domain;

import lombok.Data;

@Data
public class Diary {
	
	//일기 구분 번호
	private String d_seq;
	
	//일기 제목
	private String d_title;
	
	//일기 날짜
	private String d_date;
	
	//일기 내용
	private String d_content;
	
	//사진 위도
	private int img_lat;
	
	//사진 경도
	private int img_lon;
	
	//실제 사진명
	private String img_real_name;
	
	//사진 여부
	private char d_img_yn;
	
}
