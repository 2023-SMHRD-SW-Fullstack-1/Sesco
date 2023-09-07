package com.smhrd.sesco.service;

import java.time.LocalDate;
import java.util.HashMap;
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
	
	//노트 불러오기(연도별로 그룹화)
	public Map<Integer,List<Note>> getNotesGroupByYear(){
		Map<Integer, List<Note>> groupNotes = new HashMap<>();
		
		//연도 2000년부터??
		for(int year = 2000; year <=LocalDate.now().getYear(); year++) {
			 List<Note> notesInYear = noteMapper.selectNotesByYear(year);
             if (!notesInYear.isEmpty()) { // 해당 연도에 노트가 있으면 추가
                 groupNotes.put(year, notesInYear);
             }
		}
		return groupNotes; 
	}
}
