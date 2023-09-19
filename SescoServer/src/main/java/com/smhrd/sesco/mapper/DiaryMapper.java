package com.smhrd.sesco.mapper;


import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import java.util.ArrayList;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import com.smhrd.sesco.domain.Diary;

@Mapper
public interface DiaryMapper {


	//전체 게시글 조회
	public List<Diary> diaryList(Diary diary);
	
	//일기 등록
	public int DiaryRegister(Diary diary);
	
	//일기 수정
	
	public void DiaryUpdate(Diary diary);
	
	//일기 삭제
	public void DiaryDelete(Diary diary);

	public ArrayList<Diary> getDiaryListWithImg(String user_id);

	public List<Diary> DiaryListOne(LocalDate d_date);
	


}
