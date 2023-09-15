package com.smhrd.sesco.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.sesco.domain.Kid;
import com.smhrd.sesco.domain.Note;
import com.smhrd.sesco.mapper.NoteMapper;

@Service
public class NoteService {

	@Autowired
	private NoteMapper noteMapper;

	@Autowired
	private KidService kidService;

	// 사용자 ID로 모든 수첩 조회
	public List<Note> getNotesByUser(String userId) {
	    // 회원ID에 해당하는 아이들의 정보 목록 가져오기
	    ArrayList<Kid> kids = kidService.getKidList(userId);

	    if (!kids.isEmpty()) {
	        int firstKidSeq = Integer.parseInt(kids.get(0).getKid_seq());
	        return getNotesByKid(firstKidSeq);
	    }

	    return new ArrayList<>(); // 아이가 없으면 빈 리스트 반환
	}
	

	
	// 아이 선택했을때 수첩 불러오기
	public List<Note> getNotesByKid(int kidSeq) {
	    List<Note> notes = noteMapper.selectNotesByKid(kidSeq);
	    
	    if (notes.size() > 6) {
	        notes = notes.subList(0, 6); // 최대 6개의 노트만 유지
	    }
	    
	    return notes;
	}

	// 태그 검색
	public Map<Integer, List<Note>> searchNotesByTag(String tag) {
		Map<Integer, List<Note>> groupNotes = new LinkedHashMap<>();

		// 현재 연도부터 2000년까지 역순
		for (int year = LocalDate.now().getYear(); year >= 2000; year--) {
			List<Note> notesInYear = noteMapper.selectNotesByTagAndYear(tag, year);
			if (!notesInYear.isEmpty()) { // 해당 연도에 태그가 있는 노트가 있으면 추가
				groupNotes.put(year, notesInYear);
			}
		}

		return groupNotes;
	}



	// 수첩 생성
//	public void createNote(Note note) {
//		System.out.println("service 수첩 생성:" + note);
//		noteMapper.noteInsert(note);
//	}

	// 수첩 수정
//	public void updateNote(Note updatedNote) {
//		System.out.println("service 수첩 수정:" + updatedNote);
//		noteMapper.noteUpdate(updatedNote);
//	}

	// 수첩 삭제
//	public void noteDeleteById(String note_seq) {
//		noteMapper.noteDeleteById(note_seq);
//
//	}

}
