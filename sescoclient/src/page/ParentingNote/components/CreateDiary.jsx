import React, { useState } from 'react';
import './CreateDiary.css';

const CreateDiary = ({ onComplete }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 작성완료 버튼 클릭 시 처리 로직 추가
    console.log('제목:', title);
    console.log('내용:', content);
    console.log('이미지 파일:', imageFile);

    // ... 추가적인 로직 수행

    onComplete(title, content,imageFile);

    setTitle('');
    setContent('');
    
  
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
<div className="form-group">
<label htmlFor="image">이미지 첨부</label>
<input type="file" id="image" accept="image/*" onChange={handleImageUpload} />
{/* 이후 이미지 파일 처리 로직을 구현해주세요 */}
{/* 예를 들어, 선택한 이미지 파일을 서버로 업로드하거나 미리보기를 제공하는 등의 동작 */}
</div>

<button type='submit'>작성완료</button>


 </form>

 </div>

 );
};

export default CreateDiary;