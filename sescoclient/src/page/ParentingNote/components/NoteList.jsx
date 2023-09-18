import React, { useEffect, useRef, useState } from 'react';
import './noteList.css';
import noteClose from '../noteImg/noteClose.png'
import noteOpen from '../noteImg/noteOpen.png'
import noteKid from '../noteImg/noteKid.png'

const NoteList = ({ notes, onNoteClick, kidSeq, kids, tagSearchResults }) => {
    const [noteOpenStatus, setNoteOpenStatus] = useState(Array(notes.length).fill(false));

    const [noteKidStatus, setNoteKidStatus] = useState(Array(notes.length).fill(false));
    console.log("******props start*******")
    console.log("notes : ", notes)
    console.log("kidSeq : ", kidSeq)
    console.log("kids : ", kids)
    console.log("tagSearchResults : ", tagSearchResults)

    console.log("******props end*******")

    // kidSeq 값이 변경될 때 noteOpenStatus 초기화
    useEffect(() => {
        setNoteOpenStatus(Array(notes.length).fill(false));
        setNoteKidStatus(Array(notes.length).fill(false));
    }, [kidSeq]);

    const handleNoteItemClick = (index) => {
        const newNoteOpenStatus = Array(notes.length).fill(false);
        newNoteOpenStatus[index] = true;
        setNoteOpenStatus(newNoteOpenStatus);

        const newNoteKidStatus = Array(notes.length).fill(false);
        newNoteKidStatus[index] = true;
        setNoteKidStatus(newNoteKidStatus);
        // 노트 클릭했을때 note_seq값을 Note 컴포넌트로 전달
        onNoteClick(notes[index].note_seq);
    };
    // const handleNoteItemClick = (index) => {
    //      // 현재 노트의 상태 가져오기
    //      const currentOpenStatus = noteOpenStatus[index];
    //      const currentKidStatus = noteKidStatus[index];
 
    //      // 현재 노트의 상태를 토글 (반대로 변경)
    //      const newNoteOpenStatus = [...noteOpenStatus];
    //      newNoteOpenStatus[index] = !currentOpenStatus;
 
    //      const newNoteKidStatus = [...noteKidStatus];
    //      newNoteKidStatus[index] = !currentKidStatus;
 
    //      // 상태 업데이트
    //      setNoteOpenStatus(newNoteOpenStatus);
    //      setNoteKidStatus(newNoteKidStatus);
 
    //      // 노트 클릭했을때 note_seq값을 Note 컴포넌트로 전달
    //      onNoteClick(notes[index].note_seq);
    // };

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

                            {/* 태그 검색 결과 숫자 표시 */}
                            {tagSearchResults[note.note_seq] > 0 && (
                                <div className='tagResultItem'>
                                    {tagSearchResults[note.note_seq]}
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NoteList;