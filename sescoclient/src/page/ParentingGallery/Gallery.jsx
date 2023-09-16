
import React, { useState, useEffect } from 'react'
import './gallery.css'
import Banner from './components/Banner'
import GalleryMap from './components/GalleryMap'
import axios from 'axios'
import { LocalContext } from './localContext'
import CityList from './components/CityList'
import CityGallery from './components/CityGallery'

const Gallery = () => {

  //선택한 지역
  const [clickedLocal, setClickedLocal] = useState()
  //도시 선택
  const [selectedCity, setSelectedCity] = useState(null)


  // 사진경로리스트
  const [imgNameList, setImgNameList] = useState([])
  //도 (특별시 포함)
  const [firstNameList, setFirstNameList] = useState([])
  //시
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
      console.log("데이터통신성공")
      console.log(res.data)
      res.data.map((item)=>
          setImgInfoList([...imgInfoList, 
            {
              imgName : item.img_real_name,
              firstName : item.img_do,
              secondName : item.img_si 
            }
          ])
      )
    }).catch((err)=>console.log("데이터 불러오기 실패"+err))
  }, []) 


  //해당 지역에 대한 정보 filtering하기 위함
function updateList(){
    const filteredList = imgInfoList.filter(info => info.firstName === clickedLocal)
    setImgNameList([])
    setFirstNameList([])
    setSecondNameList([])

    setImgNameList([...filteredList.map(info => info.imgName)])
    setFirstNameList([...filteredList.map(info => info.firstName)])
    setSecondNameList([...filteredList.map(info => info.secondName)])
 } 

  // 선택지역이 바뀌면 데이터가 바뀜
  useEffect(()=>{
    updateList()
    setSelectedCity(null)
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
                <h2>{clickedLocal}</h2>
                {
                  // 선택한 지역이아직 없는경우
                  clickedLocal==null ?
                  <>골라봐</>
                  : 
                  // 선택한 지역에 사진이 없는 경우
                  secondNameList.length>0 ?
                    (
                      // 지역내에서 특정 도시를 선택한 경우 
                      selectedCity==null ?
                        <CityList secondNameList={secondNameList} setSelectedCity={setSelectedCity}></CityList>
                      :
                        <CityGallery></CityGallery>
                    )
                  :
                  <>없어요</>
                }
              </div>
            </div>
        </LocalContext.Provider>
    </>
  );
};


export default Gallery

