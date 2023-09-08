package com.smhrd.sesco.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.sesco.domain.Diary;
import com.smhrd.sesco.mapper.DiaryMapper;

@Service
public class DiaryService {

	@Autowired
	private DiaryMapper mapper;
	
	public ArrayList<Diary> getDiaryListWithImg(String user_id){
		return mapper.getDiaryListWithImg(user_id);
	}
}
