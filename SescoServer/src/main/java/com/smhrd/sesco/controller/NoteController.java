package com.smhrd.sesco.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smhrd.sesco.domain.Kid;
import com.smhrd.sesco.domain.Note;
import com.smhrd.sesco.service.KidService;
import com.smhrd.sesco.service.NoteService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {

	@Autowired
	private NoteService noteService;

	// 수첩 불러오기
//	@GetMapping("/note/{userId}")
//	public List<Note> getNotes(@PathVariable String userId) {
//	    System.out.println("첫 접속 수첩 불러오기:" + noteService.getNotesByUser(userId));
//	    return noteService.getNotesByUser(userId);
//	}

	// 옵션에서 아이 선택시 해당 아이의 수첩 불러오기
	// kid_seq값을 받음
	@PostMapping("/note/getnotelist")
	public List<Note> getNoteList(@RequestBody Map<String, Integer> kidSeqMap) {
		Integer kidSeq = kidSeqMap.get("kid_seq");

		if (kidSeq != null) {
			// kid_seq 값이 유효한 경우에만 해당 아이의 수첩을 가져옴
			System.out.println("아이 선택시 수첩 불러오기: " + noteService.getNotesByKid(kidSeq));
			return noteService.getNotesByKid(kidSeq);
		} else {
			// kid_seq 값이 없거나 유효하지 않은 경우 빈 목록 반환
			return new ArrayList<>();
		}
	}

	// 태그 검색
//	@GetMapping("/note/tagsearch")
//	public Map<Integer, List<Note>> getNotesByTag(@RequestParam String tag) {
//		System.out.println("태그 검색 " + noteService.searchNotesByTag(tag));
//		return noteService.searchNotesByTag(tag);
//	}

//	@GetMapping("/note/tagsearch")
//	public List<Note> getNotesByTag(@RequestParam String tag) {
//		System.out.println("태그 검색 결과 : "+ noteService.searchNotesByTag(tag));
//	    return noteService.searchNotesByTag(tag);
//	}

	@GetMapping("/note/tagsearch")
	public List<Note> getNotesByTag(@RequestParam String tag, @RequestParam String userId) {
		System.out.println("태그 검색 결과 : " + noteService.searchNotesByTag(tag, userId));
		return noteService.searchNotesByTag(tag, userId);
	}

	// 수첩 생성
//	@PostMapping("/note/createnote")
//	public void createNote(@RequestBody Note note) {
//		System.out.println("controller 수첩 생성  : " + note);
//		noteService.createNote(note);
//	}
	// 수첩 생성
	@PostMapping("/note/createnote")
	public void createNotes(@RequestBody Kid kid) {
		System.out.println("Controller 수첩 생성: " + kid);
		noteService.createNotes(kid);
	}

	// 수첩 수정
//	@PutMapping("/note/update")
//	public void updateNote(@RequestBody Map<String, String> noteData) {
//	    String noteSeq = noteData.get("note_seq");
//	    String newName = noteData.get("n_name");
//
//	    System.out.println("controller 수첩 수정:  note_seq=" + noteSeq + ", n_name=" + newName);
//
//	    Note updatedNote = new Note();
//	    updatedNote.setNote_seq(noteSeq);
//	    updatedNote.setN_name(newName);
//
//	    noteService.updateNote(updatedNote);
//	}

	// 수첩 삭제
//	@DeleteMapping("/note/delete/{note_seq}")
//	public void deleteNoteById(@PathVariable String note_seq) {
//		System.out.println("삭제할 수첩 ID: " + note_seq);
//		noteService.noteDeleteById(note_seq);
//	}

	// 작성자 : 홍재성 // 기능:수첩 조회 및 생성
	@PostMapping("/note/createnotev2")
	public ArrayList<Note> noteSelectAndCreate(@RequestBody Note note) {
		System.out.println("아이번호:" + note.getKid_seq());
//		Note selectNote = new Note();
//		selectNote.setKid_seq(kidSeq);

		int result = noteService.noteSelect(note);
		System.out.println("resutl:" + result);

		ArrayList<Note> noteList = new ArrayList<>();
		if (result == 0) { // 해당아이의 노트가 없을 때
			noteService.noteSelectAndCreate(note);
		}
		noteList = noteService.LoadNote(note);
		return noteList;

	}

}
