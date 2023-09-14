package com.smhrd.sesco.domain;

import java.io.File;
import java.sql.Date;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Diary {
	
	//일기 구분 번호
	private String d_seq;
	//일기 제목
	private String d_title;
	
//	public Diary(String d_title, LocalDate d_date) {
//		super();
//		this.d_title = d_title;
//		this.d_date = d_date;
//	}

	//일기 날짜
	private LocalDate d_date;
	
	//일기 내용
	private String d_content;
	
	//사진 위도
	private String img_do;
	
	//사진 경도
	private String img_si;
	
	//실제 사진명
	private String img_real_name;
	
	//사진 여부
	private String d_img_yn;

	//수접 구분번호
	private String note_seq;

	//태그
	private String d_tags;
	

}
