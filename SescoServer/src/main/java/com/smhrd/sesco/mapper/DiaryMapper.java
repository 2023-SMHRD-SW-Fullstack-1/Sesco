package com.smhrd.sesco.mapper;


import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import java.util.ArrayList;


import org.apache.ibatis.annotations.Mapper;

import com.smhrd.sesco.domain.Diary;

@Mapper
public interface DiaryMapper {


	//전체 게시글 조회
	public List<Diary> DiaryList(Date d_date);
	
	//일기 등록
	public int DiaryRegister(Diary diary);
	
	//일기 수정
	public void DiaryUpdate(Diary diary);
	
	//일기 삭제
	public int DiaryDelete(Date d_date);

	public ArrayList<Diary> getDiaryListWithImg(String user_id);

	public List<Diary> DiaryListOne(LocalDate d_date);
	


}
