import React, { useState, useEffect } from 'react'
import './Gallery.css';
import Banner from './components/Banner';
import GalleryMap from './components/GalleryMap';
import LocalList from './components/LocalList';
import axios from 'axios'

const Gallery = () => {

  // 사진정보리스트
  const [clickLocal, setClickLocal] = useState()
  const [imgNameList, setImgNameList] = useState()
  const [firstNameList, setFirstNameList] = useState(["전라남도", "전라남도"])
  const [secondNameList, setSecondNameList] = useState(["여수시", "여수시"])

  // childList
  
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
      // res.data.img_name
      // res.data.img_lat
      setFirstNameList([...firstNameList])
      setSecondNameList([...secondNameList])
      // res.data.img_lon
    })
  }, []) 
    
  return (
    <>
    <Banner/>
        <div style={{ display: 'flex'}}>
          <div style={{ width: "1080px", height: "800px" }}>
            <GalleryMap firstNameList={new Set(firstNameList)} secondNameList={new Set(secondNameList)} ></GalleryMap>
          </div>
          <div>
            <LocalList></LocalList>
          </div>
        </div>
    </>
  )
}

export default Gallery
