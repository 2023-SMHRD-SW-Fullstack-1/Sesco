package com.smhrd.sesco.service;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.sesco.converter.ImageConverter;
import com.smhrd.sesco.converter.ImageToBase64;
import com.smhrd.sesco.domain.Diary;
import com.smhrd.sesco.mapper.DiaryMapper;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

@Service
public class DiaryService {

	@Autowired
	private DiaryMapper diaryMapper;
	
	//해당 날짜의 게시글 조회
	public List DiaryList(Date d_date) {
		List<Diary> list = diaryMapper.DiaryList(d_date);
		
		JSONArray jsonArray = new JSONArray();
		ImageConverter<File, String> converter = new ImageToBase64();
		
		for (Diary community : list) {

			File uploadDir = new File("c:/uploadImage");
			File uploadedFile = new File(uploadDir, community.getImg_real_name());
//			System.out.println("uploadedFile 값 : " + uploadedFile);
			String filePath = uploadedFile.getAbsolutePath();

//			System.out.println("filePath : " + filePath);
			Resource resource = new FileSystemResource(uploadedFile); // 파일의 메타데이터
//			System.out.println(resource);
			String fileStringValue = null;
			try {
				fileStringValue = converter.convert(resource.getFile());
			} catch (IOException e) {
				e.printStackTrace();
			} catch (NullPointerException e) {
				e.printStackTrace();
			}

//			System.out.println(fileStringValue);
			community.setImg_real_name(fileStringValue);
			JSONObject obj = new JSONObject();

			jsonArray.add(community);
			
		}

		return list;
		
	}
	
	
	//일기 등록
	public int DiaryRegister(Diary diary) {
		return diaryMapper.DiaryRegister(diary);
	}
	
	//일기 수정
	public void DiaryUpdate(Diary diary) {
		diaryMapper.DiaryUpdate(diary);
	}
	
	//일기 삭제
	public int DiaryDelete(Date d_date) {
		System.out.println(d_date);
		return diaryMapper.DiaryDelete(d_date);
	}

	
	
}
