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

	private long kid_seq;
	private String kid_name;
	private Date kid_birth;
	private double kid_height;
	private double kid_weight;
	private String user_id;
	private char kid_gender;
}
