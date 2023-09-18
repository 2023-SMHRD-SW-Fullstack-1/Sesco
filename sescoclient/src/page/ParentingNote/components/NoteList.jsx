import React, { useEffect, useRef, useState } from 'react';
import './noteList.css';
import noteClose from '../noteImg/noteClose.png'
import noteOpen from '../noteImg/noteOpen.png'
import noteKid from '../noteImg/noteKid.png'

function NoteList({ notes, onNoteClick, kidSeq, kids }) {
  const [noteOpenStatus, setNoteOpenStatus] = useState(Array(6).fill(false));

  const [noteKidStatus, setNoteKidStatus] = useState(Array(6).fill(false));
    console.log("******props*******")
    console.log("notes : ",notes)
    console.log("kidSeq : ",kidSeq)
    console.log("kids : ",kids)
    console.log("******props*******")
    
  const handleNoteItemClick = (index) => {
    const newNoteOpenStatus = Array(6).fill(false);
    newNoteOpenStatus[index] = true;
    setNoteOpenStatus(newNoteOpenStatus);

    const newNoteKidStatus = Array(6).fill(false);
    newNoteKidStatus[index] = true;
    setNoteKidStatus(newNoteKidStatus);
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
            key={index}
            onClick={() => handleNoteItemClick(index)}
            style={{
              width: '200px',
              height: '200px',
              backgroundImage: noteOpenStatus[index] ? `url(${noteOpen})` : `url(${noteClose})`,
              backgroundSize: 'cover',
            }}
          >

             {/* 연령대 표시 */}
             <div className='noteAge-container'>
             <span className='noteList-age'>
             {`${index}세`}
            </span>
            </div>

             {/* noteKid 이미지 표시 */}
             <div className='noteKid-container'>
             {noteKidStatus[index] && (
              <img src={noteKid} alt="Note Kid" className="noteKid-image" />
            )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList;