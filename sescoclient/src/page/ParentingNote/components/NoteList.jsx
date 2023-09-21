import React, { useEffect, useRef, useState } from 'react';
import './noteList.css';
import noteClose from '../noteImg/noteClose.png'
import noteOpen from '../noteImg/noteOpen.png'
import noteKid from '../noteImg/noteKid.png'
import noteLock from '../noteImg/noteLock.png'

const NoteList = ({ notes, onNoteClick, kidSeq, kids, tagSearchResults, isDiaryOpen, tagSearchText, clickableNotes, lockedNotes }) => {
    const [noteOpenStatus, setNoteOpenStatus] = useState(Array(notes.length).fill(false));

    const [noteKidStatus, setNoteKidStatus] = useState(Array(notes.length).fill(false));
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
    //console.log("******props start*******")
    // console.log("notes : ", notes)
    // console.log("kidSeq : ", kidSeq)
    // console.log("kids : ", kids)
    // console.log("tagSearchResults : ", tagSearchResults)
    // console.log("태그 검색 결과 텍스트 : ", tagSearchText)
    // console.log("다이어리 오픈 상태 props : ", isDiaryOpen)
    // console.log("클릭 가능2 : ", clickableNotes)
    // console.log("클릭 불가3 : ", lockedNotes)

    //console.log("******props end*******")

    // 다이어리를 닫을 때 선택된 노트 초기화

    // kidSeq 값이 변경될 때 noteOpen, noteKid 초기화
    useEffect(() => {
        setNoteOpenStatus(Array(notes.length).fill(false));
        setNoteKidStatus(Array(notes.length).fill(false));
        setSelectedNoteIndex(null);
    }, [kidSeq]);

 

    //노트 클릭했을 때 
    const handleNoteItemClick = (index) => {

        const isClickable = clickableNotes.some((note) => note.note_seq === notes[index].note_seq);

        if (isClickable) {


            const newNoteOpenStatus = Array(notes.length).fill(false);
            newNoteOpenStatus[index] = !noteOpenStatus[index]; // 노트 열림/닫힘
            setNoteOpenStatus(newNoteOpenStatus);

            const newNoteKidStatus = Array(notes.length).fill(false);
            newNoteKidStatus[index] = !noteKidStatus[index]; // 아이 보이거나/숨기거나
            setNoteKidStatus(newNoteKidStatus);

            //setSelectedNoteIndex(index);

            if (selectedNoteIndex === index) {
                // 같은 노트를 다시 클릭한 경우
                setSelectedNoteIndex(null); // 선택 해제
            } else {
                setSelectedNoteIndex(index); // 선택된 노트의 인덱스 업데이트
            }

            // 노트 클릭했을때 note_seq값을 Note 컴포넌트로 전달
            onNoteClick(notes[index].note_seq);
        }
    };


    return (
        <div>
            <div className='allNoteList-container'>
                {/* 연도 div */}
                <div className='noteList-container'>
                    <span className='noteList-year'>
                        {kidSeq ? kids.find((kid) => kid.kid_seq === kidSeq)?.kid_name : ""}
                    </span>
                </div>

                {/*태그 검색한 텍스트 표시 */}
                {tagSearchText ? (
                    <div className='tagResultText'>
                        <span className="tag-text">태그 검색 : {tagSearchText}</span>
                    </div>
                ) : null}
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
                                backgroundImage: isDiaryOpen ? (noteOpenStatus[index] ? `url(${noteOpen})` : `url(${noteClose})`) : `url(${noteClose})`,
                                backgroundSize: 'cover',
                            }}
                        >
                            <div className='noteLock-container'>
                                {lockedNotes.some(lockedNote => lockedNote.note_seq === note.note_seq) && (
                                    <img src={noteLock} alt="NoteLock" className="noteLock-image"></img>)}
                            </div>

                            {/* 연령대 표시 */}
                            <div className='noteAge-container'>
                                <span className={`noteList-age ${isDiaryOpen &&selectedNoteIndex === index ? 'selected-note-text' : ''}`}>
                                    {tagSearchResults[note.note_seq] ? `${note.n_name}` : `${index}세`}
                                </span>
                            </div>


                            {/* noteKid 이미지 표시 */}
                            <div className='noteKid-container'>
                                {isDiaryOpen && noteKidStatus[index] && (
                                    <img src={noteKid} alt="Note Kid" className="noteKid-image" />
                                )}

                            </div>
                            {/* 태그 검색 결과 숫자 표시 */}
                            {tagSearchResults[note.note_seq] > 0 && (
                                <div className='tagResultItem'>
                                    검색결과 :
                                    {tagSearchResults[note.note_seq]}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NoteList;