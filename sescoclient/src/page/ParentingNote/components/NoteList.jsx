import React, { useEffect, useRef, useState } from 'react';
import './noteList.css';
import noteClose from '../noteImg/noteClose.png'
import noteOpen from '../noteImg/noteOpen.png'
import axios from 'axios';

function NoteList({ notes, onNoteClick, kidSeq, allKidSeq, kids }) {

    const [noteOpenStatus, setNoteOpenStatus] = useState(Array(6).fill(false));
    console.log("**NoteList**")
    console.log("props로 넘겨 받은 kidSelect : ", kidSeq)
    console.log("props로 넘겨 받은 allKidSeq : ", allKidSeq)

    const handleNoteItemClick = (index) => {
        const newNoteOpenStatus = [...noteOpenStatus];
        newNoteOpenStatus[index] = !newNoteOpenStatus[index];
        setNoteOpenStatus(newNoteOpenStatus);
        console.log("수첩 이미지 클릭 : ", index)
    };

    return (
        <div>
            {/* 연도 div */}
            <div className='noteList-container'>
                <span className='noteList-year'>

                    {kidSeq ? kids.find((kid) => kid.kid_seq === kidSeq)?.kid_name : ""}

                </span>

            </div>

            {/* 노트 감싸는 큰 영역 */}
            <div className="notes-container">
                {notes.map((note, index) => (
                    <div
                        className="note-item-container"
                        key={note.seq}
                        onClick={() => handleNoteItemClick(index)}
                        style={{
                            width: '150px',
                            height: '200px',
                            backgroundImage: `url(${noteOpenStatus[index] ? noteOpen : noteClose})`,
                            backgroundSize: 'cover',
                        }}
                    ></div>
                ))}
            </div>

        </div>
    );
}
export default NoteList;