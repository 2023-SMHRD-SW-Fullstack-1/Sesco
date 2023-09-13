import React, { useEffect, useRef, useState } from 'react';
import './noteList.css';
import noteList from '../noteImg/noteList.png'
import addNoteBtn from '../noteImg/addNoteBtn.png'
import rightBtn from '../noteImg/noteRight.png'
import leftBtn from '../noteImg/noteLeft.png'
import axios from 'axios';

function NoteList({ year, notes, onAddNote, onNoteClick, kidSeq }) {
    const [visibleNotes, setVisibleNotes] = useState(8);
    const [startIndex, setStartIndex] = useState(0);
    const [addNoteImg, setAddNoteImg] = useState(false);
    const [newNoteName, setNewNoteName] = useState("");

    console.log("kidSelect : ",kidSeq)

    const scrollLeft = () => {
        console.log("왼쪽 화살표 클릭")
        setStartIndex(prev => Math.max(prev - 1, 0));
    }

    const scrollRight = () => {
        console.log("오른쪽 화살표 클릭")
        setStartIndex(prev => Math.min(prev + 1, notes.length - visibleNotes));
    };

    // +버튼 클릭 시
    const handleAddNoteImageClick = () => {
        console.log("추가 버튼 이미지 클릭");

        setVisibleNotes(prev => prev + 1);
        // 버튼을 클릭하면 setAddNoteImg true로 설정
        // 이미지를 조건부로 렌더링
        setAddNoteImg(true);
    };

    // 수첩 저장 버튼 클릭 시 
    const handleSaveNewNote = () => {
        console.log("수첩 저장 버튼 클릭, 수첩 이름 :", newNoteName);
        console.log("수첩 저장 버튼 클릭 : ", kidSeq)
        
        const note = {
            n_name : newNoteName,
            kid_seq : kidSeq 
        }

        axios.post('http://localhost:8081/sesco/note/createnote',note)
        .then(response =>{
            console.log("백엔드 응답 : ",note)
        })
        .catch(e => {
            console.log("백엔드 요청 실패 : ", e)
        })
    }

    return (
        <div>
            {/* 연도 div */}
            <div className='noteList-year-container'>

                <span className='noteList-year'>
                    <img src={leftBtn} onClick={scrollLeft} className='note-arrow-left' />
                    {year}

                    <img src={rightBtn} onClick={scrollRight} className='note-arrow-right' />
                </span>

            </div>

            {/* 노트 감싸는 큰 영역 */}
            <div className="notes-container" >
                {notes.slice(startIndex, startIndex + visibleNotes).map((note, index) => (
                    // 노트 제목 + 일자 등등 영역
                    <div key={index} className='note-item-container'
                        onClick={() => onNoteClick(note.seq)} style={{ width: '150px', height: '200px', backgroundImage: `url(${noteList})`, backgroundSize: 'cover' }}>
                        {/*<img src={noteList} className="note-background" style={{width:'150px', height:'50px' ,marginRight:'20px'}}/>*/}
                        <span className='note-item-span'>
                            <span>{`${note.name}`}</span>
                            <br />
                            <span>{`(${note.startDate} ~ ${note.endDate})`}</span>
                        </span>
                    </div>
                ))}
                {/* +버튼 영역 */}
                {addNoteImg && (
                    <div className='note-item-container' style={{ width: '150px', height: '200px', backgroundImage: `url(${noteList})`, backgroundSize: 'cover' }} onClick={() => onAddNote()}>
                       

                        {/* 수첩 이름 입력란 */}
                        <input type="text" value={newNoteName} onChange={(e) => setNewNoteName(e.target.value)} placeholder="수첩 이름" />

                        {/* 저장 버튼 */}
                        <button onClick={() => handleSaveNewNote(newNoteName)}>저장</button>
                    </div>
                )}

                <img src={addNoteBtn} onClick={() => handleAddNoteImageClick()} className='noteList-addBtn' alt='Add Note'></img>

            </div>

        </div>
    );
}
export default NoteList;