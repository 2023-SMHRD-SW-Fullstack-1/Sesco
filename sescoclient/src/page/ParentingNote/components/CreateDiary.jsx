import React, { useState } from 'react';
import './CreateDiary.css';


const CreateDiary = ({ onComplete }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    
    // 작성완료 버튼 클릭 시 처리 로직 추가
    console.log('제목:', title);
    console.log('내용:', content);
    // ... 추가적인 로직 수행
    

    onComplete(title, content);

    setTitle("");
    setContent("");///

    // Diarycopy 컴포넌트로 데이터 전달
    // 예시: props.onComplete(title, content)
    // props.onComplete(title, content);
  };

  return (
    <div className="create-diary-container">
      <h2>일기 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea id="content" value={content} onChange={handleContentChange}></textarea>
        </div>
        <button type="submit">작성완료</button>
      </form>
    </div>
  );
};

export default CreateDiary;
