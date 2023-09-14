package com.smhrd.sesco.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Kid {

	private String kid_seq;
	private String kid_name;
	private Date kid_birth;
	private double kid_height;
	private double kid_weight;
	private String user_id;
	private char kid_gender;
	
	public Kid(double kid_height, double kid_weight, String user_id) {
		this.kid_height = kid_height;
		this.kid_weight = kid_weight;
		this.user_id = user_id;
	}
}
