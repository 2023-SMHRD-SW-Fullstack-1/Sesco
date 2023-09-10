import React, { useState } from "react";
import "./CreateDiary.css";
import axios from "axios";

const CreateDiary = ({ onComplete }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [tags, setTags] = useState([]);

  const handleTagChange = (e) => {
    // 태그 입력값 변경 시 상태 업데이트
    setTags(e.target.value.split(","));
  };

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

  //일기 작성
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // 작성완료 버튼 클릭 시 처리 로직 추가
  //   console.log("제목:", title);
  //   console.log("내용:", content);
  //   console.log("이미지 파일:", imageFile);

  //   // ... 추가적인 로직 수행

  //   onComplete(title, content, imageFile, tags);

  //   setTitle("");
  //   setContent("");
  // };

  //일기 작성
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // FormData 객체 생성
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", imageFile);

      // 태그 배열을 문자열로 변환하여 FormData에 추가
      if (tags.length > 0) {
        formData.append("tags", tags.join(","));
      }

      // Spring 서버로 POST 요청 보내기
      await axios.post("http://localhost:8081/a", formData);

      // 완료 콜백 호출하여 부모 컴포넌트에 데이터 전달
      onComplete(title, content, imageFile, tags);

      // 입력값 초기화
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("일기 작성 실패:", error);
    }
  };

  return (
    <div className="create-diary-container">
      <h2>일기 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
          <label htmlFor="tags">태그</label>
          <input
            type="text"
            id="tags"
            value={tags.join(",")}
            onChange={handleTagChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">이미지 첨부</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {/* 이후 이미지 파일 처리 로직을 구현해주세요 */}
          {/* 예를 들어, 선택한 이미지 파일을 서버로 업로드하거나 미리보기를 제공하는 등의 동작 */}
        </div>

        <button type="submit">작성완료</button>
      </form>
    </div>
  );
};

export default CreateDiary;
