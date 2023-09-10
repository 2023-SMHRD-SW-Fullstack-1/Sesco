package com.smhrd.sesco.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smhrd.sesco.domain.Diary;
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
	
	
	
	//일기 등록
	@PostMapping(value="/a", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public @ResponseBody void DiaryRegister(@RequestPart("data") Diary  diary, @RequestPart("file") MultipartFile file) {
if (file != null) {
	        String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
	        String uploadPath = "c:\\uploadImage";
	        try {
	            // 파일 저장
	            File destFile = new File(uploadPath, newFileName);
	            System.out.println("1234567890");
	            file.transferTo(destFile);

	            // 저장된 파일 경로 설정
	            diary.setImg_real_name(uploadPath);
	            System.out.println(diary.getImg_real_name());
	        } catch (IllegalStateException e) {
	            e.printStackTrace();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }
	    try {
	    	diary.getD_seq();
	    	diaryService.commRegister2(diary);
	    } catch(NullPointerException error) {
	    	diaryService.commRegister(diary);
	    }
	}
	
	
	

}
