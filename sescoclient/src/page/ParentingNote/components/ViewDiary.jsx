import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import EXIF from "exif-js";
import './viewDiary.css'

const ViewDiary = ({ selectdate, noteData}) => {
  const [tags, setTags] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 플래그
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedImage, setEditedImage] = useState(null);
  const [editedImagePreview, setEditedImagePreview] = useState(null);
  const [editedLatitude, setEditedLatitude] = useState(null);
  const [editedLongitude, setEditedLongitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');


  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState([]);
  const [tagsToSend,  setTagsToSend] = useState('');
  const [noteseq, setNoteseq] = useState(''); 
  useEffect(()=>{
    setNoteseq(noteData.noteSeq)
  },[])

  
  

  function getPrevious() {
    if (current > 0) {
      setCurrent(current - 1);
    }
  }

  function getNext() {
    if (current < selectdate.length - 1) {
      setCurrent(current + 1);
    }
  }

  useEffect(() => {
    if (selectdate[current] && selectdate[current].tags) {
      const tagsWithoutHash = selectdate[current].tags.filter(tag => !tag.includes('#'));
      setTags(tagsWithoutHash)
    } else {
      
    }
  }, [selectdate, current]);


  useEffect(() => {
    if (selectdate[current]) {
      setEditedTitle(selectdate[current].title);
      setEditedContent(selectdate[current].content);
      // setEditedTags(selectdate[current].tag);
      setEditedImage(null); // 이미지는 초기화
      setEditedImagePreview(null);
      setProvince(selectdate[current].img_do);
      setCity(selectdate[current].img_si);
    }
  }, [selectdate, current]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setEditedImage(file);
    setEditedImagePreview(URL.createObjectURL(file));
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
  

  
    // 이미지 수정 시 위도와 경도 다시 계산
    useEffect(() => {
      const getExif = async () => {
        try {
          await new Promise((resolve) => {
            EXIF.getData(editedImage, function () {
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
                setEditedLatitude(lat);
                setEditedLongitude(lon);
  
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
  
      if (editedImage) {
        getExif();
      }
    }, [editedImage]);
  
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

  const handleSaveChanges = async (e) => {
    e.preventDefault();
      const formData = new FormData();
      formData.append("d_seq", selectdate[current].d_seq);
      formData.append("d_title", editedTitle);
      formData.append("d_date",selectdate[current].date)
      formData.append("d_content", editedContent);
      formData.append("d_tags", tagsToSend);
      formData.append("img_do", province);
      formData.append("file",editedImage);
      formData.append("img_si", city);
      formData.append("note_seq",noteseq);
      // if (editedImage) {
      //   formData.append("file", editedImage);
      // }

      if(editedImage){
        formData.append("d_img_yn","Y"); //이미지 있냐 없냐
      }
      else{
        formData.append("d_img_yn", "N")    
      }

      const response = await axios.post(
        "http://localhost:8081/sesco/diary/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response, e.g., show success message, update state, etc.
      console.log("Diary modification response:", response);

      // After successful modification, exit the edit mode
      setIsEditing(false);
    }; 

    const handleDeleteDiary = async () => {
      try {
        const dSeqToDelete = selectdate[current].d_seq;
        const response = await axios.post(
          `http://localhost:8081/sesco/diary/delete`, {d_seq: dSeqToDelete}
        );
  
        if (response.status === 200) {
          // 삭제 요청이 성공한 경우
          // 이후에 필요한 작업 수행 (예: 일기 목록 다시 불러오기)
          console.log("Diary deleted successfully.");
          // 다음 일기 또는 이전 일기로 이동하거나 원하는 작업 수행
          // 예: getNext(), getPrevious() 호출 또는 다른 작업 수행
        } else {
          // 실패한 경우에 대한 처리
          console.error("Failed to delete diary.");
        }
      } catch (error) {
        console.error("Error while deleting diary:", error);
      }
    };

    


  return (
    <div className="view-top-container">
      {isEditing ? (
        // Editing mode
        <form>
          <input
            type="text"
            placeholder="제목"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            placeholder="내용"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="tag-box">
        {tagList.map((tagItem, index) => (
          <div className="tag-item" key={index}>
            <span>{tagItem}</span>
            <button className="cancel-tag-item" onClick={deleteTagItem}>X</button>
          </div>
        ))}
        <input
          className="add-tag-item"
          type="text"
          placeholder="Press enter to add tags"
          tabIndex={2}
          onChange={(e) => setTagItem(e.target.value)}
          value={tagItem}
          onKeyPress={onKeyPress}
        />
        {errorMessage && <div>{errorMessage}</div>}
      </div>
          {errorMessage && <div>{errorMessage}</div>}
          <div>
            {editedImagePreview && (
              <img src={editedImagePreview} alt="이미지 미리보기" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button onClick={handleSaveChanges}>
            수정 완료
          </button>
          <button onClick={handleCancelEdit}>취소</button>
        </form>
      ) : (
        // View mode
        <div className="view-container">
          <div className="view-box">
            <p className="view-diary-title">{selectdate[current].title}</p>
            <p>{selectdate[current].content}</p>
            {selectdate[current].img && (
              <div className="view-diary-img-box">
                <img className="view-diary-img" src={"data:image/;base64," + selectdate[current].img} alt="" />
              </div>
            )}
            {tags.length > 0 && (
              <div className="tag-box">
                {tags.map((tag, index) => (
                  <div className="tag-item" key={index}>{tag}</div>
                ))}
              </div>
            )}

              <div>
                <button onClick={getPrevious}>이전</button>
                <button onClick={getNext}>다음</button>
              </div>

            <button onClick={handleEditClick}>수정하기</button>
            <button onClick={handleDeleteDiary}>일기 삭제</button>
          </div>
        </div>
      )}
    </div>
  )
};


export default ViewDiary;
