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
  console.log("사용자 닉네임 : ", userNick)
  console.log("사용자 Id :", userId)
  //아이 정보
  const [kids, setKids] = useState([]);
  //일기
  const [diary, setDiary] = useState(null);

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

  //사용자의 아이 정보 불러오기
  useEffect(() => {
    const getKids = async () => {
      try {
        const response = await axios.post('http://localhost:8081/sesco/kid/getkidlist', { user_id: userId })
        setKids(response.data)
        console.log("아이 불러오기 성공", response.data)
      } catch (e) {
        console.error("아이 정보 불러오기 실패", e)
      }
    }
    getKids();
  }, [])

  //아이 선택했을때
  useEffect(() => {
    const getNotesByKid = async () => {
      try {

        if (kidSelect === "모든 아이") { // '모든 아이'가 선택된 경우
          const reseponse = await axios.get(`http://localhost:8081/sesco/note/${userId}`);
          setNotes(reseponse.data)
          console.log("모든 아이 선택 : ", reseponse.data)
        } else { // 특정 아이가 선택된 경우
          console.log("kidSelect ", kidSelect)
          const reseponse = await axios.post('http://localhost:8081/sesco/note/getnotelist', { kid_seq: kidSelect });
          setNotes(reseponse.data)
          console.log("특정 아이 선택", reseponse.data)
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

  //추가 버튼 클릭했을 때
  const handleAddNote = (year) => {
    console.log("추가버튼클릭:", year)
    //setNotesDisplay(prev => ({ ...prev, [year]: true }));
    setNotesDisplay(prev => ({ ...prev, [year]: !prev[year] }));
    // 아이 선택 값 저장하기
    setKidSelect(kidSelect);
    console.log("추가 버튼 클릭시 아이 선택, kid_seq값 :", kidSelect);
  };

  //노트 클릭시
  const handleNoteClick = async (note_seq, year) => {
    console.log('노트클릭시,note_seq, year :', note_seq, year)
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
  };

  return (
    <div className='note-container'>
      <div class="book">
        <img class="noteBackground" src={noteBackground} />
        <div className="note-book-text">
          <span class="book-span">
            “ {userNick} ” 님의 <br />
          </span>
          <span class="book-span2">Book 캡슐 🧊 </span>
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
          <select className='note-myKidSelect' onChange={handlekidSelectChange} value={kidSelect}>
            <option className='note-myKidSelectOption' value="모든 아이">모든 아이</option> {/* '모든 아이' 옵션 추가 */}
            {kids.map((kid) => (
              <option className='note-myKidSelectOption' value={kid.kid_seq} key={kid.kid_seq}>{kid.kid_name}</option>

            ))}
          </select>

        </div>
      </div>

      <div className='noteList'>
        {/* Object.entries :
    notes 객체에서 key, value 형태 배열들 생성하여 반환
    객체=>배열로, map 사용하기위함 */}
        {/*notes : 해당 연도에 해당하는 노트 정보, map 이용해 필요한 데이터 추출하여 전달  */}
        {/* sort 함수 사용 : key(연도)에 따라 내림차순으로 
    연도 최신순부터 정렬 */}

        {Object.entries(notes).sort((a, b) => b[0] - a[0]).map(([year, notesInYear]) => (
          <React.Fragment key={year}>
            <NoteList
              year={year}
              notes={notesInYear.map(note => ({
                name: note.n_name,
                startDate: note.n_s_date,
                endDate: note.n_e_date,
                seq: note.note_seq
              }))}
              onAddNote={() => handleAddNote(year)}
              onNoteClick={(note_seq) => handleNoteClick(note_seq, year)}
              kidSeq = {kidSelect}
              key={year}

            />

            {/** 선택된 연도와 노트 있을 경우 다이어리 표시 */}
            {selectedNoteYear === year && selectedNoteSeq &&
              <div className='diary-container active'>
                <Diarycopy kidSeq={kidSelect}  />
                <button className='diary-close' onClick={() => handleDiaryClose()}>X</button>
              </div>}
            {/* 사용자가 추가 버튼 클릭시  */}
            

          </React.Fragment>
        ))}

      </div>

    </div>
  );
};

export default Note;