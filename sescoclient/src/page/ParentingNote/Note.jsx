import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NoteList from './components/NoteList'
import Diary from './components/Diary'
import noteBackground from './noteImg/noteBackground.png'
import './note.css';


// import Diarycopy from './components/Diarycopy'


const Note = () => {

  //태그 검색
  const [searchTag, setSearchTag] = useState("")
  //아이 선택
  const [kidSelect, setKidSelect] = useState("")
  //수첩
  // const [diaries, setDiaries] = useState({});
  const [notes, setNotes] = useState({});
  const [notesDisplay, setNotesDisplay] = useState({});

  //사용자 닉네임
  const [userNick, setUserNick] = useState("Nick")

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
        console.log(response.data);
      } catch (e) {
        console.error("노트 불러오기 실패 : ", e);
      }
    }
    getNotes();
  }, []);

  //태그 검색 함수
  const handleSearchTagChange = (e) => {
    setSearchTag(e.target.value);
    console.log(e.target.value)
  };

  //아이 선택 함수
  const handlekidSelectChange = (e) => {
    setKidSelect(e.target.value);
    console.log(e.target.value)
  }

  const handleAddNote = (year) => {
    setNotesDisplay(prev => ({ ...prev, [year]: true }));
  };


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
        <input
          className='noteTagFind2'
          type='search'
          placeholder='태그 검색'
          value={searchTag}
          onChange={handleSearchTagChange} />


        {/* 아이선택 div */}
        <div className='noteKidSelect'>
          <select className='myKidSelect' onChange={handlekidSelectChange} value={kidSelect}>
            {selectKidList.map((item) => (
              <option className='myKidSelectOption' value={item} key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>


      {/* 수첩리스트 div */}
      {/* <div className='noteList'>
        <NoteList year={2023} notes={notes2023} onAddNote={handleAddNote} />
        {diaries[2023] && <Diary />}
        <NoteList year={2022} notes={notes2022} onAddNote={handleAddNote} />
        {diaries[2022] && <Diary />}
        <NoteList year={2021} notes={notes2021} onAddNote={handleAddNote} />
        {diaries[2021] && <Diary />}
      </div> */}

      <div className='noteList'>
        {Object.entries(notes).map(([year, notesInYear]) => (
          <>
            <NoteList year={year} notes={notesInYear.map(note => note.n_name)} onAddNote={() => handleAddNote(year)} />
            {notesDisplay[year] &&
              <Diary
                noteName={notes[year].n_name}
                startDate={notes[year].n_s_date}
                endDate={notes[year].n_e_date}
              />}
          </>
        ))}
      </div>


      {/* <Diarycopy></Diarycopy> */}

    </div>
  )
}

export default Note