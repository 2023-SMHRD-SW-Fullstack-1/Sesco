package com.smhrd.sesco.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.sesco.domain.Note;
import com.smhrd.sesco.service.NoteService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {

	@Autowired
	private NoteService noteService;

	// 수첩 불러오기
	@GetMapping("/note")
	public Map<Integer, List<Note>> getNotes() {
		System.out.println("수첩 불러오기" + noteService.getNotesGroupByYear());
		return noteService.getNotesGroupByYear();
	}

	// 옵션에서 아이 선택시 해당 아이의 수첩 불러오기
	// kid_seq값을 받음
	@PostMapping("/note/getnotelist")
	public Map<Integer, List<Note>> getNoteList(@RequestBody Map<String, Integer> kidSeqMap) {
		System.out.println("아이 선택시 수첩 불러오기" + noteService.getNotesByKid(kidSeqMap.get("kid_seq")));
		return noteService.getNotesByKid(kidSeqMap.get("kid_seq"));
	}

	// 태그 검색
	@GetMapping("/note/tagsearch")
	public Map<Integer, List<Note>> getNotesByTag(@RequestParam String tag) {
		System.out.println("태그 검색 " + noteService.searchNotesByTag(tag));
		return noteService.searchNotesByTag(tag);
	}

}
