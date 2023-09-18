import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import NoteList from './components/NoteList'
import noteBackground from './noteImg/noteBackground.png'
import noteFind from './noteImg/noteFind.png'
import './note.css';
import Diarycopy from './components/Diarycopy'

const Note = () => {

  

  //세션에서 로그인한 유저 아이디/닉네임 정보가져오기
  const userId = sessionStorage.getItem("user_id");
  const userNick = sessionStorage.getItem("user_nick");

  //세션에 프로필에서 가져온 kidSeq값이 있는지 확인 
  const kidSeq = sessionStorage.getItem("kid_seq")

  

///-------------------------Note start---------------------//

//수첩 목록 저장
const [notes, setNotes] = useState([]);

//선택한 수첩의 noteSeq값 저장
const [selectedNoteSeq, setSelectedNoteSeq] = useState(null);

//노트 불러오기 (다시)
useEffect(() => {
  const getNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/sesco/note/${userId}`);
      setNotes(response.data);
      console.log("노트 불러오기", response.data);
    } catch (e) {
      console.error("노트 불러오기 실패 : ", e);
    }
  };
  getNotes();
}, []);



//노트 클릭시
const handleNoteClick = async (note_seq) => {

  try {
    // notes에서 선택한 note_seq 값과 일치하는 노트 찾기
    const selectedNote = notes.filter((note)=>note.note_seq === note_seq);

    if (selectedNote) {
      console.log('노트클릭시, note_seq, selectedNote:', note_seq, selectedNote);

      // 다이어리 컴포넌트에 전달할 객체 생성
      const noteData = {
        kidSeq: kidSelect,
        ...selectedNote
      };

      console.log("다이어리 컴포넌트에 전달 : ", noteData)
    }
  } catch (error) {
    console.error('노트 상세 정보 가져오기 실패:', error);
  }

  setSelectedNoteSeq(note_seq);

  // 만약 이미 선택된 노트를 다시 클릭했다면
  if (selectedNoteSeq === note_seq) {
    setSelectedNoteSeq(null);
  } else {
    setSelectedNoteSeq(note_seq);

  }
}



//---------Diary start-----------//

  // 일기 열었을때 닫기 버튼 클릭시
  const handleDiaryClose = () => {
    setSelectedNoteSeq(null);
    console.log("일기 닫기 버튼 클릭 ")
  };
  
//----------Diary end----------//


///-------------------------Note end ----------------------//



///-------------------------Kid start----------------------//

 //아이 정보
 const [kids, setKids] = useState([]);

 //// 사용자 아이 정보 불러오기
useEffect(() => {
  const getKids = async () => {
    try {
      const response = await axios.post('http://localhost:8081/sesco/kid/getkidlist', { user_id: userId })
      setKids(response.data)
      console.log("사용자 아이 불러오기 성공", response.data)
    } catch (e) {
      console.error("아이 정보 불러오기 실패", e)
    }
  }
  // 사용자 아이 정보 불러오기 함수 호출
  getKids();
}, []);

//옵션 선택한 아이 저장 
const [kidSelect, setKidSelect] = useState()

//<select> useRef
const selectRef = useRef();

const defaultSelect = () => {
  kidSeq ? selectRef.current.value = kidSeq : selectRef.current.selectedIndex = 0
  const temp = selectRef.current.value
  setKidSelect(temp)
}

//로드시 세션에 저장된 kid_seq값이 있는 경우에는 해당 아이로 설정 없는 경우에는 처음에있는 아이로 설정
useEffect(() => {
  defaultSelect()
}, []);


//선택된 아이 설정
const handlekidSelectChange = (e) => {
  setKidSelect(e.target.value);
  console.log(e.target.value)
  //이후에 선택 시 그 아이의 수첩만 가져오게 하기
}


//선택한 아이의 노트 정보를 불러옴 (다시)
useEffect(() => {
  const getNotesByKid = async () => {
    console.log("선택한 아이 : ", kidSelect)
    try {
        const reseponse = await axios.post('http://localhost:8081/sesco/note/createnotev2', { "kid_seq": kidSelect });
        setNotes(reseponse.data)
        console.log("노트 설정완료 : ", reseponse.data)
    } catch (e) {
      console.error("노트 불러오기 실패 : ", e);
    }
  }
  
  getNotesByKid();
}, [kidSelect]);

///-------------------------Kid end -----------------------//



///-------------------------TAG start ---------------------//

//태그 검색
const [searchTag, setSearchTag] = useState("");

//태그 입력창 이벤트
const handleSearchTagChange = (e) => {
  setSearchTag(e.target.value);
  console.log(e.target.value);
};

//검색 버튼 눌렀을 때 이벤트
const handleTagSearch = async () => {
  console.log("검색 결과는 : ", searchTag)
  setSearchTag("")
  try {
    if (searchTag.trim() === "") return;

    const response = await axios.get('http://localhost:8081/sesco/note/tagsearch', { params: { tag: searchTag } })
    setNotes(response.data)
    console.log("태그 검색 데이터 불러오기 : ", response.data)

    //태그 검색 버튼 결과가 없을 때 
    if (Object.keys(response.data).length === 0) {
      alert("태그 검색 결과가 없습니다.😥")
      // 모든 아이의 수첩 불러오기
      const allNotesResponse = await axios.get('http://localhost:8081/sesco/note');
      setNotes(allNotesResponse.data);

      console.log("태그 검색 결과 없을 때 모든 수첩 데이터 불러오기 :", allNotesResponse.data);
    }

  } catch (e) {
    console.error("태그 검색 실패 : ", e)
  }
  setSearchTag("")
}

// Enter 키 누를 때 검색 실행
const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleTagSearch();
    setSearchTag("")
  }
}



///-------------------------TAG end ---------------------//

  return (
    <div className='note-container'>
    <div className="book">
      <img className="noteBackground" src={noteBackground} />
      <div className="note-book-text">
        <span className="book-span">
          “ {userNick} ” 님의 <br />
        </span>
        <span className="book-span2">Book 캡슐 🧊 </span>
      </div>
    </div>

    {/* 태그 검색 div */}

    <div className='noteTagAndKid-container'>
      <div className='noteTagSearch-container'>
        <input
          className='noteTagFind2'
          type='search'
          placeholder='태그 검색'
          value={searchTag}
          onChange={handleSearchTagChange}
          onKeyDown={handleKeyPress} />
        <img src={noteFind} alt='tagSearch ' className='noteTagFindIcon' onClick={handleTagSearch} />
      </div>

      {/* 아이선택 div */}
      <div className='noteKidSelect'>
        {/* value 값은 현재 선택한 아이 kid_seq값으로 설정 */}
        <select ref={selectRef} className='note-myKidSelect' title="아이 선택" onChange={handlekidSelectChange} value={kidSelect}>
          {kids.map((kid) => (
            <option className='note-myKidSelectOption' value={kid.kid_seq} key={kid.kid_seq}>{kid.kid_name}</option>
          ))}
        </select>

      </div>
    </div>

    <div className='noteList'>
      <NoteList
        notes={notes.slice(0, 6).map(note => ({
          n_name: note.n_name,
          n_s_date: note.n_s_date,
          n_e_date: note.n_e_date,
          note_seq: note.note_seq
        }))}
        onNoteClick={(note_seq) => handleNoteClick(note_seq)}
        kidSeq={kidSelect}
        kids={kids}
      />
      
      {/** 선택된 연도와 노트 있을 경우 다이어리 표시 */}
      {selectedNoteSeq && (
        <div className='diary-container active'>
          <Diarycopy kidSeq={kidSelect} />
          <button className='diary-close' onClick={() => handleDiaryClose()}>X</button>
        </div>
      )}
    </div>

  </div>
  )
}

export default Note