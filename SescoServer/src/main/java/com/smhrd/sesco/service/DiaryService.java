package com.smhrd.sesco.service;


import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
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
	

	//널값 허용하지 않는 코드
	
//	public JSONObject DiaryList(Date d_date){
//	    List<Diary> list = diaryMapper.DiaryList(d_date);
//	    
//	    JSONObject obj = new JSONObject();
//	    JSONArray jsonArray = new JSONArray();
//	    JSONArray jsonArray2 = new JSONArray();
//	    ImageConverter<File, String> converter = new ImageToBase64();
//
//	    for (Diary diary : list) {
//	        try {
//	            // 파일 경로 설정
//	            String filePath = diary.getImg_real_name();
//	            if(filePath != null && !filePath.equals("c:\\uploadImage")) {
//	            	 System.out.println(filePath);
//	 	            
//	 	            // 파일이 실제로 존재하는지 확인
//	 	            File uploadedFile = new File(filePath);
//	 	            if (!uploadedFile.exists()) {
//	 	                // 파일이 존재하지 않는 경우 처리
//	 	                continue; // 다음 루프로 이동
//	 	            }
//
//	 	            Resource resource = new FileSystemResource(uploadedFile);
//	 	            String fileStringValue = converter.convert(resource.getFile());
//
//	 	            diary.setImg_real_name(fileStringValue);
//
//	 	            jsonArray.add(diary);
//	            }
//	           
//	        } catch (IOException e) {
//	            e.printStackTrace();
//	            // 파일 변환 실패 시 예외 처리
//	        } catch (NullPointerException e) {
//	            e.printStackTrace();
//	            // NullPointerException 처리
//	        }
//	    }
//	    obj.put("diary", jsonArray);
//
//	    return obj;
//	}
	
	//널값 허용하는 코드
	public JSONObject diaryList(Diary diary){
	    List<Diary> list = diaryMapper.diaryList(diary);
	    System.out.println("안녕못해");
	    
	    JSONObject obj = new JSONObject();
	    JSONArray jsonArray = new JSONArray();
	    ImageConverter<File, String> converter = new ImageToBase64();

	    for (Diary diaryItem : list) {
	        try {
	            // 파일 경로 설정
	            String filePath = diaryItem.getImg_real_name();
	            System.out.println(filePath);

	            // filePath가 null이 아니고, "c:\\uploadImage"와 다르다면 이미지 처리 로직을 수행합니다.
	            if(filePath != null && !filePath.equals("c:\\uploadImage")) {
	                File uploadedFile = new File(filePath);

	                // 파일이 실제로 존재하는지 확인
	                if (!uploadedFile.exists()) {
	                    // 파일이 존재하지 않는 경우 처리
	                    continue; // 다음 루프로 이동
	                }

	                Resource resource = new FileSystemResource(uploadedFile);
	                String fileStringValue = converter.convert(resource.getFile());

	                diaryItem.setImg_real_name(fileStringValue);
	            }

	            jsonArray.add(diaryItem);  // 이 부분은 filePath의 값에 상관없이 항상 실행됩니다.
	        } catch (IOException e) {
	            e.printStackTrace();
	        } catch (NullPointerException e) {
	            e.printStackTrace();
	        }
	    }
	    obj.put("diary", jsonArray);

	    return obj;
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
	public void DiaryDelete(Diary diary) {
		diaryMapper.DiaryDelete(diary);
	}
	

	//이미지가 있는 다이어리 리스트

	public ArrayList<Diary> getDiaryListWithImg(String user_id){
		ArrayList<Diary> list = diaryMapper.getDiaryListWithImg(user_id);
		ImageConverter<File, String> converter = new ImageToBase64();
		for (Diary diary : list) {
	        try {
	            String filePath = diary.getImg_real_name();
	            File uploadedFile = new File(filePath);
	            if (!uploadedFile.exists()) {
                    // 파일이 존재하지 않는 경우 처리
                    continue; // 다음 루프로 이동
                }
	            System.out.println("넘어옴");
	            Resource resource = new FileSystemResource(uploadedFile);
	            String fileStringValue = converter.convert(resource.getFile());
	            diary.setImg_real_name(fileStringValue);
	        } catch (IOException e) {
	            e.printStackTrace();
	        } catch (NullPointerException e) {
	            e.printStackTrace();
	        }
	        
	    }
		
		return list;
	}

	//누른날짜의 일기 리스트 조회
	public List<Diary> DiaryListOne(LocalDate d_date) {
		List<Diary> list = diaryMapper.DiaryListOne(d_date);
		return list;
	}

	
	

}
