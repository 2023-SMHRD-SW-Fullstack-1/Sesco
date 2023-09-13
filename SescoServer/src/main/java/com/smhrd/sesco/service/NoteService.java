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

	// 수첩 불러오기(연도별로 그룹화)
	//public Map<Integer, List<Note>> getNotesGroupByYear(String userId) {
		//Map<Integer, List<Note>> groupNotes = new LinkedHashMap<>();

		// 현재 연도부터 2000년까지 역순
		//for (int year = LocalDate.now().getYear(); year >= 2000; year--) {
			//List<Note> notesInYear = noteMapper.selectNotesByYear(year);
			//if (!notesInYear.isEmpty()) { // 해당 연도에 수첩 있으면 추가
				//groupNotes.put(year, notesInYear);
			//}
		//}
		//return groupNotes;
	//}
	// 사용자 ID로 노트 조회
	public Map<Integer, List<Note>> getNotesByUser(String userId) {
	    // 회원ID에 해당하는 모든 아이들의 정보 목록을 가져옵니다.
	    List<Kid> kids = kidService.getKidList(userId);

	    Map<Integer, List<Note>> groupNotes = new LinkedHashMap<>();

	    // 각 아이(kid)에 대해
	    for (Kid kid : kids) {
	        try {
	            int kidSeq = Integer.parseInt(kid.getKid_seq());
	            // 해당 아이의 수첩을 연도별로 그룹화
	            Map<Integer, List<Note>> notesForKid = getNotesByKid(kidSeq);

	            // 각 연도에 대해
	            for (Map.Entry<Integer, List<Note>> entry : notesForKid.entrySet()) {
	                int year = entry.getKey();
	                if (!groupNotes.containsKey(year)) {
	                    groupNotes.put(year, new ArrayList<>());
	                }
	                groupNotes.get(year).addAll(entry.getValue());
	            }
	        } catch (NumberFormatException e) {
	            // kid_seq 값이 숫자로 변환할 수 없는 경우 처리할 내용 추가 가능
	        }
	    }

	    return groupNotes;
	}


	

	// 아이 선택했을때 수첩 불러오기
	public Map<Integer, List<Note>> getNotesByKid(int kidSeq) {
		Map<Integer, List<Note>> groupNotes = new LinkedHashMap<>();

		// 현재 연도부터 2000년까지 역순
		for (int year = LocalDate.now().getYear(); year >= 2000; year--) {
			List<Note> notesInYear = noteMapper.selectNotesByKid(kidSeq, year);
			if (!notesInYear.isEmpty()) { // 해당 연도에 수첩 있으면 추가
				groupNotes.put(year, notesInYear);
			}
		}
		return groupNotes;
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
	
	//수첩 생성
	public void createNote(Note note) {
		System.out.println("service 수첩 생성:"+note);
		noteMapper.noteInsert(note);
	}
	
	//수첩 수정
	public Note updateNote(Note updatedNote) {
		
		 return noteMapper.noteUpdate(updatedNote);
	}
	
	//수첩 삭제 
	public void noteDeleteById(String noteId) {
		return;
		
	}

}
