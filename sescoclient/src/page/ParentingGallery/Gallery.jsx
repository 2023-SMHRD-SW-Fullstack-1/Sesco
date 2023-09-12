
import React, { useState, useEffect } from 'react'
import './Gallery.css';
import Banner from './components/Banner';
import GalleryMap from './components/GalleryMap';
import LocalList from './components/LocalList';
import axios from 'axios'
import { LocalContext } from './localContext';
import CityList from './components/CityList';


const Gallery = () => {

  //선택한 지역
  const [clickedLocal, setClickedLocal] = useState()
  // 사진정보리스트
  const [imgNameList, setImgNameList] = useState()
  const [firstNameList, setFirstNameList] = useState(["전라남도", "전라남도"])
  const [secondNameList, setSecondNameList] = useState(["여수시", "여수시"])

  // 사진정보객체리스트
  const [imgInfoList, setimgInfoList] = useState([])
  
  useEffect(() => {
    //회원정보가 있는지 확인하기
    //1. 세션에서 회원정보 가져오기 ->? 오류처리
    // if()
    let user_id = 'weq'


    //회원정보 중 이미지가 있는 일기 정보를 다 불러옴 
    axios.post("http://localhost:8081/sesco/diary/getdiarylist/img", {
      body:{
        user_id : {user_id}
      }
    }).then((res)=>{
      //이미지가 있는 일기 정보를 전부다 가져왔음
      setimgInfoList([...imgInfoList, 
        {
          // imgName : res.data.img_real_name
          // firstName : 
          // secondName : 
        }])
    })
  }, []) 

  // 선택지역이 바뀌면 데이터가 바뀜
  useEffect(()=>{
    setImgNameList()
    setFirstNameList()
    setSecondNameList()
  },[clickedLocal])
    
  return (
    <>
      <Banner/>
        <LocalContext.Provider value={{clickedLocal, setClickedLocal}}>
            <div style={{ display: 'flex'}}>
              <div style={{ width: "1080px", height: "800px" }}>
                <GalleryMap firstNameList={new Set(firstNameList)} secondNameList={new Set(secondNameList)} ></GalleryMap>
              </div>
              <div className='gallery-city-container'>
                {/* <LocalList></LocalList> */}
                <CityList imgNameList={imgNameList} firstNameList={firstNameList} secondNameList={secondNameList}></CityList>
              </div>
            </div>
        </LocalContext.Provider>
    </>
  );
};


export default Gallery

