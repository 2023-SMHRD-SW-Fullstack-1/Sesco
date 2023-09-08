package com.smhrd.sesco.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HtSurveyDetail {

	private long hsvd_seq;
	private String hsvd_category;
	private int hsvd_num;
	private String hsvd_content;
	private int hsv_seq;
	
}
