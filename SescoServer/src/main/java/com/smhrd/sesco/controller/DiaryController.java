package com.smhrd.sesco.controller;

import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.sesco.service.DiaryService;

@RestController 
@CrossOrigin(origins = "http://localhost:3000")
public class DiaryController {
	
	
	@Autowired
	private DiaryService diaryService;
	
	//누른 날짜의 일기 리스트 조회
	@PostMapping(value="/mypost")
	public @ResponseBody List DiaryList(@RequestBody String d_date) {
		System.out.println(d_date);
		return diaryService.DiaryList(d_date);
	}
	
	
	

}
