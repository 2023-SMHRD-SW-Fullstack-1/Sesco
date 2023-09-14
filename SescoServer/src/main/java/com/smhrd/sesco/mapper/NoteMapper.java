package com.smhrd.sesco.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.smhrd.sesco.domain.Note;

@Mapper
public interface NoteMapper {

	// 모든 수첩 불러오기
	//List<Note> selectNotesByYear(int year);
	List<Note> selectNotesByYear();

	// 특정 아이의 수첩 불러오기
	List<Note> selectNotesByKid(int kidSeq, int year);

	// 태그 검색
	List<Note> selectNotesByTagAndYear(String tag, int year);

	// 수첩 생성
	void noteInsert(Note note);

	// 수첩 수정
	Note noteUpdate(Note note);

	// 수첩 삭제
	void noteDeleteById(@Param("noteId") String noteID);

}
