package com.smhrd.sesco.mapper;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.smhrd.sesco.domain.Note;

@Mapper
public interface NoteMapper {

	//처음 접속 시 수첩 불러오기
	List<Note> selectNotes();

	// 특정 아이의 수첩 불러오기
	List<Note> selectNotesByKid(int kidSeq);

	// 태그 검색
	//List<Note> selectNotesByTagAndYear(String tag, int year);
	List<Note> selectNotesByTag(String tag, String userId);
	// 수첩 생성
	void noteInsert(Note note);

	
	// 작성자 : 홍재성 // 기능:수첩 조회 및 생성
	public void noteSelectAndCreate(Note note);

	// 작성자 : 홍재성 // 기능:수첩 조회 및 생성
	public int noteSelect(Note note);

	// 작성자 : 홍재성 // 기능:수첩 조회 및 생성
	public ArrayList<Note> LoadNote(Note note);

	// 수첩 수정
	//void noteUpdate(Note note);

	// 수첩 삭제
	//void noteDeleteById(@Param("note_seq") String note_seq);

}
