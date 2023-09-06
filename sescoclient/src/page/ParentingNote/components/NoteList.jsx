import React from 'react';
import './noteList.css';
import noteList from '../noteImg/noteList.PNG'
import addNoteBtn from '../noteImg/addNoteBtn.png'

function NoteList({ year, notes, onAddNote }) {
    return (
        <div>
            {/* 연도 div */}
            <div className='noteList-year-container'>
                <span className='noteList-year'>{year}</span>
            </div>

            {/* 노트 감싸는 큰 영역 */}
            <div className="notes-container">
                {notes.map((note, index) => (
                    // 노트 제목 + 일자 등등 영역
                    <div key={index} className='note-item-container'>
                        <img src={noteList} className="note-background" />
                        <span className='note-item-span'>{note}</span>
                    </div>
                ))}
                {/* +버튼 영역 */}
                <img src={addNoteBtn} onClick={() => onAddNote(year)} className='noteList-addBtn' alt='Add Note'></img>
            </div>

        </div>
    );
}

export default NoteList;
