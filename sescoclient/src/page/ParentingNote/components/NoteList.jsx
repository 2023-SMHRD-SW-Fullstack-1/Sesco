import React from 'react';
import './noteList.css';
import noteList from '../noteImg/noteList.png'

function NoteList({ year, notes, onAddNote }) {
  return (
    <div>
      <span className='noteList-year'>{year}</span>
      {notes.map((note, index) => (
        <div key={index} className='note-item'>
          <img src={noteList} alt="Note background" />
          <span className='note-item-span'>{note}</span>
        </div>
      ))}
      <button onClick={() => onAddNote(year)} className='noteList-addBtn'>+</button>
    </div>
  );
}

export default NoteList;
