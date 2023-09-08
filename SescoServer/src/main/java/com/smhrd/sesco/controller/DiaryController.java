package com.smhrd.sesco.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.sesco.domain.Diary;
import com.smhrd.sesco.domain.Member;
import com.smhrd.sesco.service.DiaryService;

@RestController
@CrossOrigin("http://localhost:3000")
public class DiaryController {

	@Autowired
	private DiaryService service;
//	
	@PostMapping("/diary/getdiarylist/img")
	private ArrayList<Diary> getDiaryListWithImg(@RequestBody Member member){
		return service.getDiaryListWithImg(member.getUser_id());
	}
}
