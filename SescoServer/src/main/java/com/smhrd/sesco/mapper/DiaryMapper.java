package com.smhrd.sesco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.sesco.domain.Diary;

@Mapper
public interface DiaryMapper {

	//전체 게시글 조회
	public List<Diary> DiaryList(String d_date);

}
