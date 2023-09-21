import React, { useState, useEffect } from "react";
import "./CreateDiary.css";
import axios from "axios";
import { Calendar } from "@fullcalendar/core";
import moment from "moment";
import EXIF from 'exif-js';
import styled from 'styled-components';

const CreateDiary = ({ onComplete, selectedDate, formatDate, noteData }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 URL
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  // const [tags, setTags] = useState([]);
   //위도
   const [latitudedecimal, setLatitudeDecimal] = useState(null);

   //경도
   const [longitudedecimal, setLongitudeDecimal] = useState(null);


   const [isImg , setIsImg] = useState("");

  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState([]);
  const [tagsToSend, setTagsToSend] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [noteseq, setNoteseq] = useState('');
 
  
  

  useEffect(() => {
    const getExif = async () => {
      try {
        await new Promise((resolve) => {
          EXIF.getData(imageFile, function () {
            let lat = EXIF.getTag(this, 'GPSLatitude');
            let lon = EXIF.getTag(this, 'GPSLongitude');

            if (lat && lon) {
              const latitudeRef = EXIF.getTag(this, 'GPSLatitudeRef');
              const longitudeRef = EXIF.getTag(this, 'GPSLongitude Ref');

              lat = lat[0] + lat[1] / 60 + lat[2] / 3600;
              lon = lon[0] + lon[1] / 60 + lon[2] / 3600;

              if (latitudeRef === 'S') {
                lat *= -1;
              }

              if (longitudeRef === 'W') {
                lon *= -1;
              }

              // 위도와 경도 값을 상태로 업데이트합니다.
              setLatitudeDecimal(lat);
              setLongitudeDecimal(lon);

              // Kakao API를 사용하여 도와 시 정보를 가져옵니다.
              fetchRegionName(lat, lon);
            } else {
              console.log('이미지에 GPS 정보가 없습니다.');
            }

            resolve();
          });
        });
      } catch (error) {
        console.error('Error while getting EXIF data:', error);
      }
    };

    if (imageFile) {
      getExif();
    }
  }, [imageFile]);

  const fetchRegionName = async (latitude, longitude) => {
    try {
      const REST_API_KEY = 'fa08f9dd3f1a65f4f4c681ca677d334c'; // Kakao REST API Key를 넣어주세요
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode?x=${longitude}&y=${latitude}`,
        {
          headers: {
            Authorization: `KakaoAK ${REST_API_KEY}`,
          },
        }
      );

      if (response && response.data && response.data.documents[0]) {
        const location = response.data.documents[0];
        const dooo = `${location.region_1depth_name}`;
        const sii = ` ${location.region_2depth_name}`;
        setProvince(dooo);
        setCity(sii);
      } else {
        console.log('Kakao API로부터 도와 시 정보를 가져올 수 없습니다.');
      }
    } catch (error) {
      console.error('Error while fetching region name:', error);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 엔터 키의 기본 동작(폼 제출) 방지
      if (isValidTag(tagItem)) {
        submitTagItem();
        const tagsString = tagList.join('#');
        setTagsToSend(tagsString);
        setErrorMessage('');
      } else {
        setErrorMessage('태그는 알파벳, 숫자, 하이픈, 언더스코어만 포함해야 합니다.');
      }
    }
  };

  const isValidTag = (tag) => {
    const regex = /^[a-zA-Z0-9가-힣_-]+$/;
    return regex.test(tag);
  };

  

  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    
    setTagItem('');
    
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter((tagItem) => tagItem !== deleteTagItem);
    setTagList(filteredTagList);
  };

  // const sendTagsToServer = async () => {
  //   //이건 다시 배열로 돌려놓는 코드
  //   // const tagsString = tagList // 여러 태그를 '#'으로 구분한 문자열 생성
  //   // setTagsToSend(tagsString);
  //   

  // };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // 이미지 파일을 미리보기 URL로 설정
    
  };

  // const handleTagChange = (e) => {
  //   // 태그 입력값 변경 시 상태 업데이트
  //   setTags(e.target.value.split("#"));
  // };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(()=>{
    setNoteseq(noteData.noteSeq)
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const formData = new FormData();
    formData.append("d_title", title);
    formData.append("d_date", formatDate(selectedDate));
    formData.append("d_content", content);
    formData.append("d_tags", tagsToSend);
    formData.append("img_do", province); // 도 정보
    formData.append("img_si", city);     // 시 정보
    formData.append("file", imageFile);
    formData.append("note_seq",noteseq);
    console.log("노트 시퀀스",noteseq);
    if(imageFile){
      formData.append("d_img_yn","Y"); //이미지 있냐 없냐
    }
    else{
      formData.append("d_img_yn", "N")    
    }

    // if (tags.length > 0) {
    //   formData.append("tags", tags.join("#"));
    // }
    console.log("태그 합친거 :",tagsToSend);
    // Spring 서버로 POST 요청 보내기
    try {
      const response = await axios.post("http://localhost:8081/sesco/diary/creatediary", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      

      // 작성완료 눌렀을 시
      // 완료 콜백 호출하여 부모 컴포넌트에 데이터 전달
      onComplete(title, content, imageFile, submitTagItem);

      // 입력값 초기화
      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      // setTags([]);
      setProvince('');
      setCity('');
      setIsImg('');
      setNoteseq();
    } catch (error) {
      console.error('Error while submitting diary:', error);
    }
  };

  

  return (
    <WholeBox>
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
          
      <TagBox>
        {tagList.map((tagItem, index) => (
          <TagItem key={index}>
            <Text>{tagItem}</Text>
            <Button onClick={deleteTagItem}>X</Button>
          </TagItem>
        ))}
        <TagInput
          type="text"
          placeholder="Press enter to add tags"
          tabIndex={2}
          onChange={(e) => setTagItem(e.target.value)}
          value={tagItem}
          onKeyPress={onKeyPress}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </TagBox>
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
          {/* 이미지 미리보기 */}
         
          <label htmlFor="image">
            {/* 사진바꾸기가 추가 되어야 함? */}
            <div className="img-upload-container"> 
            {imagePreview ?

               <img className="img-pre-view" src={imagePreview} alt="이미지 미리보기" /> 
              //  <input
              //       type="file"
              //       id="image"
              //       accept="image/*"
              //       onChange={handleImageUpload}
              // />
            
            : 
               <div className="img-upload-box">
                 <img className="img-upload-icon" src={"/cameraicon.png"}></img>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
              </div>
            } 
            </div>
          </label>

          
        </div>

        <button type="submit">작성완료</button>

      </form>
    </div>
    </WholeBox>
  );
};

const WholeBox = styled.div`
  padding: 10px;
  height: 100vh;
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  margin: 10px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: tomato;
  border-radius: 5px;
  color: white;
  font-size: 13px;
`;

const Text = styled.span``;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  background-color: white;
  border-radius: 50%;
  color: tomato;
`;

const TagInput = styled.input`
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`;

export default CreateDiary;
