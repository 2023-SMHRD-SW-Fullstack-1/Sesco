package com.smhrd.sesco.controller;


import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.metrics.StartupStep.Tags;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.smhrd.sesco.domain.Diary;
import com.smhrd.sesco.domain.Member;
import com.smhrd.sesco.service.DiaryService;

@RestController 
@CrossOrigin(origins = "http://localhost:3000")
public class DiaryController {
	
	
	@Autowired
	private DiaryService diaryService;
	
	//누른 날짜의 일기 리스트 조회
	@PostMapping(value="/diary/selectlist")
	public JSONObject diaryList(@RequestBody Diary diary) {
		System.out.println("안녕");
		return diaryService.diaryList(diary);
	}
	
//	//전체 일기 리스트 조회
//	@PostMapping(value="/diary/selectlist")
//	public JSONObject DiaryList(Map<String,Object> map) {
//		 
//		return diaryService.DiaryList();
//	}
	
//	//누른 날짜의 일기 조회
//	@PostMapping(value="/diary/selectlistone")
//	public List<Diary> DiaryList(@RequestParam LocalDate d_date){
//		List<Diary> list = diaryService.DiaryListOne(d_date);
//		return list;
//	}
	
	
	//일기 등록
		@PostMapping(value = "/diary/creatediary" , consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
		public void DiaryRegister(@ModelAttribute Diary diary, @RequestPart(name = "file", required = false) MultipartFile file){
			String test = diary.getNote_seq();
			System.out.println("test"+test);
			System.out.println(diary.getD_tags());
////			 d_date 값을 String 타입으로 받아옴
//	        String dateString = diary.getD_date().toString();
//	        
//	        // dateString을 java.time.LocalDate 객체로 변환 (예시: yyyy-MM-dd 형식)
//	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//	        LocalDate date = LocalDate.parse(dateString, formatter);
//	        
//	        // diary 객체에 설정
//	        diary.setD_date(date);
//					
			Tags[] tags = null;
			
			if (file != null) {
	        String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
	        System.out.println("파일이름 :"+newFileName);
	        String uploadPath = "c:\\uploadImage";
	        
	        try {
            // 파일 저장
            File destFile = new File(uploadPath, newFileName);
            file.transferTo(destFile);
            // 저장된 파일 경로 설정
            diary.setImg_real_name("/"+destFile);
            String isImg = diary.getImg_real_name();
            
            System.out.println(diary.getImg_real_name());
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }
	    try {
	    	diary.getD_seq();
	    	diaryService.DiaryRegister(diary);
	    } catch(NullPointerException error) {
//	    	diaryService.commRegister(diary);
	    	System.out.println(error);
	    }
			
		}

	
	//일기 수정
		@PostMapping(value="/diary/update", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
		public void DiaryUpdate(@ModelAttribute Diary diary, @RequestPart(name="file", required = false) MultipartFile file) {

		    // 파일 업로드 관련 로직
			if (file != null) {
			    String newFileName = UUID.randomUUID().toString() + file.getOriginalFilename();
			    System.out.println("파일이름 :"+newFileName);
			    String uploadPath = "c:\\uploadImage";
			    
			    try {
			    // 파일 저장
			    File destFile = new File(uploadPath, newFileName);
			    file.transferTo(destFile);
			    // 저장된 파일 경로 설정
			    diary.setImg_real_name("/"+destFile);
			    String isImg = diary.getImg_real_name();
			    
			    System.out.println(diary.getImg_real_name());
			} catch (IllegalStateException e) {
			    e.printStackTrace();
			} catch (IOException e) {
			        e.printStackTrace();
			    }
			}
			try {
				diary.getD_seq();
				diaryService.DiaryUpdate(diary);
			} catch(NullPointerException error) {
//			    	diaryService.commRegister(diary);
				System.out.println(error);
			}
			
			// Set default values for properties that can be null or undefined
			if (diary.getImg_do() == null) {
			    diary.setImg_do(null);
			}
			if (diary.getImg_si() == null) {
			    diary.setImg_si(null);
			}
			if(diary.getD_tags() == null) {
				diary.setD_tags(null);
			}
			
			// DiaryService를 사용하여 일기 정보 업데이트
			diaryService.DiaryUpdate(diary);
		}

	
	//이미지가 있는 다이어리 리스트 조회
	@PostMapping("/diary/getdiarylist/img")
	private ArrayList<Diary> getDiaryListWithImg(@RequestBody Member member){
		ArrayList<Diary> resultList = new ArrayList<Diary>();
		resultList.addAll(diaryService.getDiaryListWithImg(member.getUser_id()));
		return resultList;
	}
	

//	게시글 삭제
	@PostMapping(value="/diary/delete")
	public void DiaryDelete(@RequestBody Diary diary) {
		diaryService.DiaryDelete(diary);
	}


}
