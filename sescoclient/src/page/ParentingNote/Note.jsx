import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NoteList from './components/NoteList'
import Diary from './components/Diary'
import noteBackground from './noteImg/noteBackground.png'
import noteFind from './noteImg/noteFind.png'
import './note.css';
import Diarycopy from './components/Diarycopy'


const Note = () => {

  //태그 검색
  const [searchTag, setSearchTag] = useState("")
  //아이 선택
  const [kidSelect, setKidSelect] = useState("")
  //수첩
  // const [diaries, setDiaries] = useState({});
  const [notes, setNotes] = useState({});
  const [notesDisplay, setNotesDisplay] = useState({});
  //수첩 선택
  const [selectedNoteSeq, setSelectedNoteSeq] = useState(null);
  const [selectedNoteYear, setSelectedNoteYear] = useState(null);

  //사용자 닉네임
  const [userNick, setUserNick] = useState("Nick")

  //아이 정보
  const [kids, setKids] = useState([]);

  //일기
  const [diary, setDiary] = useState(null);

  //더미데이터
  //아이 리스트
  const selectKidList = ["모든 아이", "정현", "현민", "재성", "소희", "선아"]
  //노트 리스트
  // const notes2023 = ['10월 추운 어느 날부터', '노트2', '노트3'];
  // const notes2022 = ['22년 여름', '노트5', '노트6', '노트7'];
  // const notes2021 = ['21년 어느날', '21년 가을', '노트10']

  //노트 불러오기 
  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get('http://localhost:8081/sesco/note');
        setNotes(response.data);
        console.log("노트 불러오기", response.data);
      } catch (e) {
        console.error("노트 불러오기 실패 : ", e);
      }
    }
    getNotes();
  }, []);


  //아이 선택했을때
  useEffect(() => {
    const getNotesByKid = async () => {
      try {
        let url;
        if (kidSelect === "모든 아이") { // '모든 아이'가 선택된 경우
          url = 'http://localhost:8081/sesco/note';

        } else { // 특정 아이가 선택된 경우
          url = 'http://localhost:8081/sesco/note/getnotelist';

        }
        const response = await axios.post(url, { kid_seq: kidSelect });
        setNotes(response.data);
      } catch (e) {
        console.error("노트 불러오기 실패 : ", e);
      }
    }
    if (kidSelect) {
      getNotesByKid();
    }
  }, [kidSelect]);



  //태그 검색 함수
  const handleSearchTagChange = (e) => {
    setSearchTag(e.target.value);
    console.log(e.target.value)
  };

  //검색 버튼 눌렀을 때
  const handleTagSearch = (e) => {
    console.log("검색 결과는 : ", searchTag)
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
  };

  //노트 클릭시 
  const handleNoteClick = async (note_seq, year) => {
    console.log('노트클릭,note_seq:', note_seq, year)
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
    /** 
    try{
      const response = await axios.get(`http://localhost:8081/sesco/????`);
      setDiary(response.data);
    }catch (e){
      console.error("상세 정보 조회 실패:",e)
    }*/
  }


  return (
    <div>

      <div class="book">
        <img class="noteBackground" src={noteBackground} />
        <div className='note-book-text'>
          <span class="book-span">“ {userNick} ” 님의 <br /></span>
          <span class="book-span2">Book 캡슐 🧊 </span>
        </div>

      </div >

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
          <select className='myKidSelect' onChange={handlekidSelectChange} value={kidSelect}>
            {selectKidList.map((item) => (
              <option className='myKidSelectOption' value={item} key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>


      <div className='noteList'>
        {/* Object.entries 객체=>배열로, map 사용하기위함 */}
        {/* 연도 최신순부터 정렬 */}

        {Object.entries(notes).sort((a, b) => b[0] - a[0]).map(([year, notesInYear]) => (
          <>
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
            />

            {selectedNoteYear === year && selectedNoteSeq &&
              <div className='diary-container'>
                <Diarycopy />
              </div>}
            {notesDisplay[year] && (
              <div className='diary-container'>
                <Diarycopy />
              </div>
            )}
          </>
        ))}



      </div>

    </div>
  )
}

export default Note