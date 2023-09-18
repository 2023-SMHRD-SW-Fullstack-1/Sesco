package com.smhrd.sesco.domain;

import java.util.Date; 
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//모든 생성자
@AllArgsConstructor
//기본 생성자
@NoArgsConstructor
//getter,setter
@Data
public class Note {
	
	//수첩 구분 번호
	private String note_seq;
	//수첩 이름
	private String n_name;
	//수첩 시작일
	private Date n_s_date;
	//수첩 종료일
	private Date n_e_date;
	//아이 구분 번호
	private String kid_seq;
	//수첩 삭제 여부
	private String note_d_yn;
}
