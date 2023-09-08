package com.smhrd.sesco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.sesco.domain.Note;

@Mapper
public interface NoteMapper {
	
	//모든 수첩 불러오기
	List<Note> selectNotesByYear(int year);
	
	//특정 아이의 수첩 불러오기
	List<Note> selectNotesByKid(int kidSeq, int year);
}
