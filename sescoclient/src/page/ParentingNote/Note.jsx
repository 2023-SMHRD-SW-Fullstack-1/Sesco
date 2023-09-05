import React, { useState } from 'react'
import NoteList from './components/NoteList'
import Diary from './components/Diary'
import noteBackground from './noteImg/noteBackground.png'
import './note.css';


const Note = () => {

  //태그 검색
  const [searchTag, setSearchTag] = useState("")
  //아이 선택
  const [kidSelect,setKidSelect] = useState("")
  //일기
  const [diaries,setDiaries] = useState({});

  //더미데이터
  //아이 리스트
  const selectKidList =["모든 아이","정현","현민","재성","소희","선아"]
  //노트 리스트
  const notes2023 = ['10월 추운 어느 날부터', '노트2', '노트3'];
  const notes2022 = ['노트4', '22년 여름', '노트6', '노트7'];
  const notes2021 = ['21년 어느날', '가을날','노트10']

  //태그 검색 함수
  const handleSearchTagChange = (e) => {
    setSearchTag(e.target.value);
  };

  //아이 선택 함수
  const handlekidSelectChange = (e)=>{
    setKidSelect(e.target.value);
    console.log(e.target.value)
  }

  const handleAddNote = (year) => {
    setDiaries(prev => ({ ...prev, [year]: true }));
  };
  

  return (
    <div>
      
      {/* book div */}
      {/* <div className='book-group'> */}
      <div class="book">
      <span><span class="book-span">“ 쏘현맘 ” 님의 <br /></span>
      <span class="book-span2">Book 캡슐 🧊 </span></span>
      </div >
      
      {/* </div> */}

    {/* 노트배경이미지 div */}
    <div className='noteBack'>
    <img class="noteBackground" src={noteBackground}/>
    </div>
 

    {/* 태그 검색 div */}
      <div className='noteTagAndKid-container'>
      <input 
        className='noteTagFind2'
        type='search'
        placeholder='태그 검색'
        value={searchTag}
        onChange={handleSearchTagChange}/>
      
      
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
       <div className='noteList'>
        <NoteList year={2023} notes={notes2023} onAddNote={handleAddNote} />
        {diaries[2023] && <Diary />}
        <NoteList year={2022} notes={notes2022} onAddNote={handleAddNote} />
        {diaries[2022] && <Diary />}
        <NoteList year={2021} notes={notes2021} onAddNote={handleAddNote} />
        {diaries[2021] && <Diary />}
       </div>

    </div>
  )
}

export default Note