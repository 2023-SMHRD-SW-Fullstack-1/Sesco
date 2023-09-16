import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NoteList from './components/NoteList'
import noteBackground from './noteImg/noteBackground.png'
import noteFind from './noteImg/noteFind.png'
import './note.css';
import Diarycopy from './components/Diarycopy'

const Note = () => {
  //태그 검색
  const [searchTag, setSearchTag] = useState("");
  //아이 선택
  const [kidSelect, setKidSelect] = useState("모든 아이")
  // kid_seq 값을 배열로 저장하는 상태 변수 추가 
  const [getMoveKidSeq, setGetMoveKidSeq] = useState([]);

  //수첩
  const [notes, setNotes] = useState([]);
  //수첩 표시
  const [notesDisplay, setNotesDisplay] = useState({});
  //수첩 선택
  const [selectedNoteSeq, setSelectedNoteSeq] = useState(null);

  //연도 선택
  const [selectedNoteYear, setSelectedNoteYear] = useState(null);


  //사용자 닉네임
  const userNick = sessionStorage.getItem("user_nick");
  const userId = sessionStorage.getItem("user_id");
  const kidSeq = sessionStorage.getItem("kid_seq")
  console.log("사용자 닉네임 : ", userNick)
  console.log("사용자 Id :", userId)
  //아이 정보
  const [kids, setKids] = useState([]);
  console.log("아이 정보 : ", kids)
  const [isNoteCreated, setIsNoteCreated] = useState(false);


  //노트 불러오기
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


// 사용자 아이 정보 불러오기
useEffect(() => {
  const getKids = async () => {
    try {
      const response = await axios.post('http://localhost:8081/sesco/kid/getkidlist', { user_id: userId })
      setKids(response.data)
      console.log("사용자 아이 불러오기 성공", response.data)

      // 각 아이에 대해 노트를 생성하거나 확인
      for (const kid of response.data) {
        const kidNotesResponse = await axios.get(`http://localhost:8081/sesco/note/${kid.kid_seq}`);
        const kidNotes = kidNotesResponse.data;
        console.log("아이의 노트 정보:", kidNotes.length);

        // 아이의 노트가 없으면 노트 생성
        if (kidNotes.length === 0) {
          console.log(`아이의 노트가 없으므로 노트 생성: ${kid.kid_name}`);
          await axios.post('http://localhost:8081/sesco/note/createnote', kid);
          
          // isNoteCreated 값을 true로 설정하여 한 번만 실행되도록 함
          setIsNoteCreated(true);
        }
      }

      const allKidSeq = response.data.map((kid) => kid.kid_seq);
      setGetMoveKidSeq(allKidSeq)
      console.log("모든아이 kid_seq값 배열1 : ", allKidSeq);
    } catch (e) {
      console.error("아이 정보 불러오기 실패", e)
    }
  }

  // 사용자 아이 정보 불러오기 함수 호출
  getKids();
}, [userId, setIsNoteCreated]); // 의존성 배열에 setIsNoteCreated 추가

//노트 상태 업데이트 후 실행할 코드 추가
useEffect(() => {
  if (isNoteCreated) { 
    // isNoteCreated 값에 따라 추가 작업 수행
    
    const getUpdatedNotesByKid = async () => {
      try{
         // 이전에 생성한 note와 동일한 방식으로 해당 아이의 업데이트된 note를 가져옴

         for(const updatedKid of kids){
           const updatedKidNotesResponse = await axios.get(`http://localhost:8081/sesco/note/${updatedKid.kid_seq}`);
           const updatedKidNotes = updatedKidNotesResponse.data;
           console.log(`업데이트된 ${updatedKid.kid_name}의 note 정보`, updatedKidNotes);
           
           // 업데이트된 note 상태를 업데이트함 
           setSelectedNoteSeq(updatedSelectedNoteSeq=>({
             ...updatedSelectedNoteSeq,
             [updatedKid.kid_seq]: updatedKidNotes,
           }));
         }
       }catch(e){
         console.error("업데이트된 note 가져오기 실패:", e);
       }
     };
    
     getUpdatedNotesByKid();
   }
 }, [isNoteCreated, kids]);

  //아이 선택했을때
  useEffect(() => {
    const getNotesByKid = async () => {
      try {
        //받아온 시퀀스 값이 있으면 해당 시퀀스 값을 설정

        if (kidSeq == null && kidSelect == null) {
          setKidSelect("모든 아이")
        } else if (kidSelect === "모든 아이") { // '모든 아이'가 선택된 경우
          const reseponse = await axios.get(`http://localhost:8081/sesco/note/${userId}`);
          setNotes(reseponse.data)
          const allKidSeq = kids.map((kid) => kid.kid_seq);
          console.log("출력", allKidSeq)
          setGetMoveKidSeq(allKidSeq)
          console.log("모든 아이 선택 : ", reseponse.data)
        } else { // 특정 아이가 선택된 경우
          console.log("kidSelect ", kidSelect)
          const reseponse = await axios.post('http://localhost:8081/sesco/note/getnotelist', { kid_seq: kidSelect });
          setNotes(reseponse.data)
          console.log("특정 아이 선택", reseponse.data)
          setGetMoveKidSeq(kidSelect)
          console.log("특정 아이의 kid_seq 값: ", kidSelect)
        }

      } catch (e) {
        console.error("노트 불러오기 실패 : ", e);
      }
    }
    if (kidSelect) {
      getNotesByKid();
    }
  }, [kidSelect]);

  //태그 검색 이벤트
  const handleSearchTagChange = (e) => {
    setSearchTag(e.target.value);
    console.log(e.target.value);
  };

  //검색 버튼 눌렀을 때
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

  //아이 선택 함수
  const handlekidSelectChange = (e) => {
    setKidSelect(e.target.value);

    console.log(e.target.value)
    //선택 시 그 아이의 수첩만 가져오게 하기
  }


  // 다이어리 컴포넌트에 전달할 수첩 객체
  let noteData = null;

  //노트 클릭시
  const handleNoteClick = async (note_seq, year) => {

    try {
      // notes에서 선택한 note_seq 값과 일치하는 노트 찾기
      const selectedNote = notes[year].find(note => note.note_seq === note_seq);

      if (selectedNote) {
        console.log('노트클릭시, note_seq, year, selectedNote:', note_seq, year, selectedNote);

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
    setSelectedNoteYear(year);

    // 만약 이미 선택된 노트를 다시 클릭했다면
    if (selectedNoteSeq === note_seq && selectedNoteYear === year) {
      setSelectedNoteSeq(null);
      setSelectedNoteYear(null);
    } else {
      setSelectedNoteSeq(note_seq);
      setSelectedNoteYear(year);

    }
  }

  // 일기 열었을때 닫기 버튼 클릭시
  const handleDiaryClose = () => {
    setSelectedNoteSeq(null);
    setSelectedNoteYear(null);
    console.log("일기 닫기 버튼 클릭 ")
  };


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
          <select className='note-myKidSelect' title="아이 선택" onChange={handlekidSelectChange} value={kidSelect}>
            <option className='note-myKidSelectOption' value="모든 아이">모든 아이</option> {/* '모든 아이' 옵션 추가 */}
            {kids.map((kid) => (
              <option className='note-myKidSelectOption' value={kid.kid_seq} key={kid.kid_seq}>{kid.kid_name}</option>
            ))}
          </select>

        </div>
      </div>

      <div className='noteList'>
        <NoteList
          notes={notes.slice(0, 6).map(note => ({
            name: note.n_name,
            startDate: note.n_s_date,
            endDate: note.n_e_date,
            seq: note.note_seq
          }))}
          onNoteClick={(note_seq) => handleNoteClick(note_seq)}
          kidSeq={kidSelect}
          kids = {kids}
          allKidSeq={getMoveKidSeq}
        />

        {/** 선택된 연도와 노트 있을 경우 다이어리 표시 */}
        {selectedNoteSeq && (
          <div className='diary-container active'>
            <Diarycopy kidSeq={kidSelect} noteData={noteData} />
            <button className='diary-close' onClick={() => handleDiaryClose()}>X</button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Note;