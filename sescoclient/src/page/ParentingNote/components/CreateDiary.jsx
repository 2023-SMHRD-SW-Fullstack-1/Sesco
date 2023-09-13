import React, { useState, useEffect } from "react";
import "./CreateDiary.css";
import axios from "axios";
import { Calendar } from "@fullcalendar/core";
import moment from "moment";
import EXIF from 'exif-js';

const CreateDiary = ({ onComplete, selectedDate, formatDate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 URL
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [tags, setTags] = useState([]);
   //위도
   const [latitudedecimal, setLatitudeDecimal] = useState(null);

   //경도
   const [longitudedecimal, setLongitudeDecimal] = useState(null);


   const [isImg , setIsImg] = useState('');
 
  

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // 이미지 파일을 미리보기 URL로 설정
    if(file){
      setIsImg("Y")
    }
    else{
      setIsImg("N")
    }
  };

  const handleTagChange = (e) => {
    // 태그 입력값 변경 시 상태 업데이트
    setTags(e.target.value.split("#"));
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    
    const formData = new FormData();
    formData.append("d_title", title);
    formData.append("d_date", formatDate(selectedDate));
    formData.append("d_content", content);
    formData.append("d_tags", tags.join("#"));
    formData.append("img_do", province); // 도 정보
    formData.append("img_si", city);     // 시 정보
    formData.append("file", imageFile);
    formData.append("d_img_yn",isImg); //이미지 있냐 없냐
    
    if (tags.length > 0) {
      formData.append("tags", tags.join("#"));
    }

    

    // Spring 서버로 POST 요청 보내기
    try {
      const response = await axios.post("http://localhost:8081/sesco/diary/creatediary", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // 작성완료 눌렀을 시
      // 완료 콜백 호출하여 부모 컴포넌트에 데이터 전달
      onComplete(title, content, imageFile, tags);

      // 입력값 초기화
      setTitle("");
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      setTags([]);
      setProvince('');
      setCity('');
      setIsImg('');
    } catch (error) {
      console.error('Error while submitting diary:', error);
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
            value={tags.join("#")}
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
          {/* 이미지 미리보기 */}
          {imagePreview && <img src={imagePreview} alt="이미지 미리보기" style={{width : "50px", height : "50px"}} />}

          <label htmlFor="image">이미지 첨부</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <button type="submit">작성완료</button>

      </form>
    </div>
  );
};

export default CreateDiary;
