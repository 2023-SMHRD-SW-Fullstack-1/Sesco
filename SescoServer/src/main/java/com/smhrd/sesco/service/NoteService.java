package com.smhrd.sesco.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
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

	// 사용자 ID로 첫번째 아이 수첩 조회
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

//		if (notes.size() > 6) {
//			notes = notes.subList(0, 6); // 최대 6개의 노트만 유지
//		}

		return notes;
	}

	// 태그 검색
//	public Map<Integer, List<Note>> searchNotesByTag(String tag) {
//		Map<Integer, List<Note>> groupNotes = new LinkedHashMap<>();
//
//		// 현재 연도부터 2000년까지 역순
//		for (int year = LocalDate.now().getYear(); year >= 2000; year--) {
//			List<Note> notesInYear = noteMapper.selectNotesByTagAndYear(tag, year);
//			if (!notesInYear.isEmpty()) { // 해당 연도에 태그가 있는 노트가 있으면 추가
//				groupNotes.put(year, notesInYear);
//			}
//		}
//
//		return groupNotes;
//	}
	public List<Note> searchNotesByTag(String tag, String userId) {
		return noteMapper.selectNotesByTag(tag, userId);
	}

	// 수첩 생성
//	public void createNote(Note note) {
//		System.out.println("service 수첩 생성:" + note);
//		noteMapper.noteInsert(note);
//	}

	// 아이 추가 시 초기 노트 생성 또는 확인
	public void createNotes(Kid kid) {

		// 아이의 노트 목록을 가져옵니다.
		List<Note> existingNotes = noteMapper.selectNotes();

		// 만약 아이의 노트가 없으면 노트 생성
		if (existingNotes.isEmpty()) {
			int kidAge = calculateKidAge(kid);
			if (kidAge >= 0 && kidAge <= 5) {
				for (int age = 0; age <= 5; age++) {
					Note note = new Note();
					note.setN_name(kid.getKid_name() + "의 " + age + "살 수첩");
					Date currentDate = new Date();
					note.setN_s_date(currentDate); // 현재 날짜로 설정
					// 현재 날짜에 1년을 더한 후 하루를 뺌
					long oneYearMillis = 365L * 24 * 60 * 60 * 1000;
					long oneDayMillis = 24L * 60 * 60 * 1000;
					long endDateMillis = currentDate.getTime() + oneYearMillis - oneDayMillis;
					Date endDate = new Date(endDateMillis);
					note.setN_e_date(endDate);
					note.setKid_seq(kid.getKid_seq());
					note.setNote_d_yn("N");

					// 노트 생성
					noteMapper.noteInsert(note);
				}
			}
		}
	}

	// 아이의 나이 계산
	private int calculateKidAge(Kid kid) {
		Date today = new Date();
		Date birthDate = kid.getKid_birth();
		long ageInMillis = today.getTime() - birthDate.getTime();
		// 밀리초를 연도로 변환 (밀리초 / 년의 밀리초)
		long oneYearInMillis = 365L * 24 * 60 * 60 * 1000;
		int age = (int) (ageInMillis / oneYearInMillis);
		return age;
	}

	// 작성자 : 홍재성 // 기능:수첩 조회 및 생성
	public void noteSelectAndCreate(Note note) {
		// select 결과 노트가 없다면 0세~6세까지 노트 생성 후 List 반환
		noteMapper.noteSelectAndCreate(note);
	}

	// 작성자 : 홍재성 // 기능:수첩 조회 및 생성
	public int noteSelect(Note note) {
		// 해당아이의 시퀀스번호로 노트가 있는지 없는지 반환
		return noteMapper.noteSelect(note);
	}

	// 작성자 : 홍재성 // 기능:수첩 조회 및 생성
	public ArrayList<Note> LoadNote(Note note) {
		// select 결과 노트가 있다면 List 반환
		return noteMapper.LoadNote(note);
	}

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
