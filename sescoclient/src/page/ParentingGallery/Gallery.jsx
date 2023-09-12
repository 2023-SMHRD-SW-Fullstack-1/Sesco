
import React, { useState, useEffect } from 'react'
import './Gallery.css'
import Banner from './components/Banner'
import GalleryMap from './components/GalleryMap'
import axios from 'axios'
import { LocalContext } from './localContext'
import CityList from './components/CityList'

const Gallery = () => {

  //선택한 지역
  const [clickedLocal, setClickedLocal] = useState()
  // 사진정보리스트
  const [imgNameList, setImgNameList] = useState([])
  const [firstNameList, setFirstNameList] = useState([])
  const [secondNameList, setSecondNameList] = useState([])

  // 사진정보객체리스트
  const [imgInfoList, setImgInfoList] = useState([])
  
  useEffect(() => {
    //회원정보가 있는지 확인하기
    //1. 세션에서 회원정보 가져오기 ->? 오류처리
    // if()
    let user_id = 'user1'


    //회원정보 중 이미지가 있는 일기 정보를 다 불러옴 
    axios.post("http://localhost:8081/sesco/diary/getdiarylist/img",{
        "user_id" : user_id
    }).then((res)=>{
      //이미지가 있는 일기 정보를 전부다 가져왔음
      // setImgInfoList([...imgInfoList, 
      //   {
      //     // imgName : {base64로 인코딩된 String문자열}
      //     // firstName : 
      //     // secondName : 
      //   }])
      console.log(res.data)
    })
    //테스트 데이터
    setImgInfoList([{
      imgName : "e",
            firstName : "전라남도",
            secondName : "광주광역시"
    },{imgName : "e",
      firstName : "전라남도",
      secondName : "여수"},{
        imgName : "e",
            firstName : "전라남도",
            secondName : "영광"
      },{
        imgName : "e",
            firstName : "전라북도" ,
            secondName : "익산"
      },{
        imgName : "e",
            firstName : "전라북도",
            secondName : "전주"
      },{
        imgName : "e",
        firstName : "전라남도",
        secondName :"담양"
      }])
  }, []) 


  //해당 지역에 대한 정보 filtering하기 위함
function updateList(){
    const filteredList = imgInfoList.filter(info => info.firstName === clickedLocal)
    setImgNameList([])
    setFirstNameList([])
    setSecondNameList([])

    setImgNameList(prevImgNameList => [...prevImgNameList, ...filteredList.map(info => info.imgName)])
    setFirstNameList(prevFirstNameList => [...prevFirstNameList, ...filteredList.map(info => info.firstName)])
    setSecondNameList(prevSecondNameLIst => [...prevSecondNameLIst, ...filteredList.map(info => info.secondName)])
 } 

  // 선택지역이 바뀌면 데이터가 바뀜
  useEffect(()=>{
    updateList()
  },[clickedLocal])
    
  return (
    <>
      <Banner/>
        <LocalContext.Provider value={{clickedLocal, setClickedLocal}}>
            <div style={{ display:'flex', width:"100%", height:"100%"}}>
              <div style={{ width:"fit-content", height: "fit-content" }}>
                <GalleryMap firstNameList={new Set(firstNameList)} secondNameList={new Set(secondNameList)} ></GalleryMap>
              </div>
              <div className='gallery-city-container'>
                {/* 선택한 지역이 있으면 List출력 */}
                <h4>{clickedLocal}</h4>
                {
                  clickedLocal &&
                  <CityList imgNameList={imgNameList} secondNameList={secondNameList}></CityList>
                }
                
              </div>
            </div>
        </LocalContext.Provider>
    </>
  );
};


export default Gallery

