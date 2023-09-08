package com.smhrd.sesco.service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.sesco.domain.Note;
import com.smhrd.sesco.mapper.NoteMapper;

@Service
public class NoteService {
	
	@Autowired
	private NoteMapper noteMapper;
	
	//수첩 불러오기(연도별로 그룹화)
	public Map<Integer,List<Note>> getNotesGroupByYear(){
		Map<Integer, List<Note>> groupNotes = new LinkedHashMap<>();
		
		// 현재 연도부터 2000년까지 역순
	    for(int year = LocalDate.now().getYear(); year >= 2000; year--) {
	        List<Note> notesInYear = noteMapper.selectNotesByYear(year);
	        if (!notesInYear.isEmpty()) { // 해당 연도에 수첩 있으면 추가
	            groupNotes.put(year, notesInYear);
	        }
	    }
		return groupNotes; 
	}
	
	//아이 선택했을때 수첩 불러오기
	public Map<Integer,List<Note>> getNotesByKid(int kidSeq){
	    Map<Integer, List<Note>> groupNotes = new LinkedHashMap<>();
		
	    // 현재 연도부터 2000년까지 역순
	    for(int year = LocalDate.now().getYear(); year >= 2000; year--) {
	        List<Note> notesInYear = noteMapper.selectNotesByKid(kidSeq, year);
	        if (!notesInYear.isEmpty()) { // 해당 연도에 수첩 있으면 추가
	            groupNotes.put(year, notesInYear);
	        }
	    }
	    return groupNotes; 
	}

}
