package com.smhrd.sesco.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.sesco.domain.Diary;

@Mapper
public interface DiaryMapper {

	public ArrayList<Diary> getDiaryListWithImg(String user_id);
}
