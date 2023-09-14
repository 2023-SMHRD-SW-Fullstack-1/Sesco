package com.smhrd.sesco.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	@GetMapping("/note/{userId}")
	public Map<Integer, List<Note>> getNotes(@PathVariable String userId) {
		System.out.println("모든 수첩 불러오기" + noteService.getNotesByUser(userId));
		return noteService.getNotesByUser(userId);
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

	// 수첩 생성
	@PostMapping("/note/createnote")
	public void createNote(@RequestBody Note note) {
		System.out.println("controller 수첩 생성  : " + note);
		noteService.createNote(note);
	}

	// 수첩 수정
	@PutMapping("/note/update")
	public void updateNote(@RequestBody Map<String, String> noteData) {
	    String noteSeq = noteData.get("note_seq");
	    String newName = noteData.get("n_name");

	    System.out.println("controller 수첩 수정:  note_seq=" + noteSeq + ", n_name=" + newName);

	    Note updatedNote = new Note();
	    updatedNote.setNote_seq(noteSeq);
	    updatedNote.setN_name(newName);

	    noteService.updateNote(updatedNote);
	}


	// 수첩 삭제
	@DeleteMapping("/note/delete/{note_seq}")
	public void deleteNoteById(@PathVariable String note_seq) {
		System.out.println("삭제할 수첩 ID: " + note_seq);
		noteService.noteDeleteById(note_seq);
	}

}
