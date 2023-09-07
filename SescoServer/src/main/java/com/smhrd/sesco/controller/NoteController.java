package com.smhrd.sesco.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.sesco.domain.Note;
import com.smhrd.sesco.service.NoteService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {
	
	@Autowired
	private NoteService noteService;
	
	//노트 불러오기 
	@GetMapping("/note")
	public Map<Integer,List<Note>> getNotes(){
		return noteService.getNotesGroupByYear();
	}
}
