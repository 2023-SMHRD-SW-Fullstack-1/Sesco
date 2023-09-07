import React, { useState, useEffect } from 'react'
import './Gallery.css';
import Banner from './components/Banner';
import GalleryMap from './components/GalleryMap';
import LocalList from './components/LocalList';
import axios from 'axios'

const Gallery = () => {

  // 사진정보리스트
  const [imgNameList, setImgNameList] = useState()
  const [gpsList, setgpsList] = useState([]) 
  const [firstNameList, setFirstNameList] = useState([])
  const [secondNameList, setSecondNameList] = useState([])

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
    })

    //가져온 이미지의 위치정보를 뽑아냄
    const REST_API_KEY = 'fa08f9dd3f1a65f4f4c681ca677d334c'
    let lat = 127.66234812321
    let lon = 34.76022112312

    //해당 위치정보를 활용
    setgpsList()

    // 좌표 값을 문자열로 변환
    // const coordinateString = gpsList.map(coord => `${coord.lon},${coord.lat}`).join(';');
    
    // API 요청
    axios.get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?${gpsList}`, {
        headers: {
            Authorization : `KakaoAK ${REST_API_KEY}`
        }
    }).then((response)=>{ console.log(response.data.documents[0])
      var location = response.data.documents[0]
      setFirstNameList([...firstNameList, location.region_1depth_name])
      setSecondNameList([...secondNameList, location.region_2depth_name])
    })

    // axios.get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode?x=${lat}&y=${lon}`,{
    //   headers:{
    //     Authorization : `KakaoAK ${REST_API_KEY}`
    //   }
    // }).then((response)=>{ console.log(response.data.documents[0])
    //   var location = response.data.documents[0]
    //   setFirstNameList([...firstNameList, location.region_1depth_name])
    //   setSecondNameList([...secondNameList, location.region_2depth_name])
    // })
  }, []) 
    
    

  return (
    <>
    <Banner/>
        <div style={{ display: 'flex'}}>
          <div style={{ width: "1080px", height: "800px" }}>
            <GalleryMap></GalleryMap>
          </div>
          <div>
            <LocalList></LocalList>
          </div>
        </div>
    </>
  )
}

export default Gallery
