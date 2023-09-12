import React, { useEffect, useRef, useState } from 'react';
import './noteList.css';
import noteList from '../noteImg/noteList.png'
import addNoteBtn from '../noteImg/addNoteBtn.png'
import rightBtn from '../noteImg/noteRight.png'
import leftBtn from '../noteImg/noteLeft.png'

function NoteList({ year, notes, onAddNote, onNoteClick }) {
    const containerRef = useRef(null);
    const [visibleNotes, setVisibleNotes] = useState(8);
    const [startIndex, setStartIndex] = useState(0);

    const scrollLeft = () => {
        // if (containerRef.current) {
        //     console.log("왼쪽 화살표 클릭")
        //     containerRef.current.scrollLeft -= 200;
        // }
        console.log("왼쪽 화살표 클릭")
        setStartIndex(prev => Math.max(prev - 1, 0));
    }

    const scrollRight = () => {
        // if (containerRef.current) {
        //     console.log("오른쪽 화살표 클릭")
        //     containerRef.current.scrollLeft += 200;
        // }
        console.log("오른쪽 화살표 클릭")
        setStartIndex(prev => Math.min(prev + 1, notes.length - visibleNotes));
    };


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
                <img src={addNoteBtn} onClick={() => onAddNote(year)} className='noteList-addBtn' alt='Add Note'></img>
            </div>

        </div>
    );
}
export default NoteList;