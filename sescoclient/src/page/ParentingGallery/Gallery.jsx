
import React, { useState, useEffect } from 'react'
import './Gallery.css'
import Banner from './components/Banner'
import GalleryMap from './components/GalleryMap'
import axios from 'axios'
import { LocalContext } from './localContext'
import CityList from './components/CityList'
import CityGallery from './components/CityGallery'
import GalleryGuide from './components/GalleryGuide'
import Footer from '../../common/Footer'
import GallerySearchFail from './components/GallerySearchFail'

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

  // 사진정보객체리스트(noteInfo랑 인덱스 공유)
  const [imgInfoList, setImgInfoList] = useState([])
  // 이미지정보객체 리스트 
  
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
      var imgTempList = []
      res.data.map((item)=>(
      imgTempList.push(
        {
          imgName : item.img_real_name,
          firstName : item.img_do,
          secondName : item.img_si,
          d_title : item.d_title,
          d_date : item.d_date, 
          d_content : item.d_content,
          d_tags : item.d_tags,
          note_seq : item.note_seq,
        }
      )
      ))
      setImgInfoList([...imgTempList])
    }).catch((err)=>console.log("데이터 불러오기 실패"+err))
  }, []) 
  
  
  //해당 지역에 대한 정보 filtering하기 위함
  function updateList(){
    const filteredList = imgInfoList.filter(info => info.firstName == clickedLocal)
    
    setImgNameList([...filteredList.map(info => info.imgName)])
    setFirstNameList([...filteredList.map(info => info.firstName)])
    setSecondNameList([...filteredList.map(info => info.secondName)])
  } 
  
  // 선택지역이 바뀌면 데이터가 바뀜
  useEffect(()=>{
    updateList()
    setSelectedCity(null)
    console.log(secondNameList)
    //현민
    console.log(imgInfoList);
    
  },[clickedLocal])
  
  return (
    <>
      <Banner/>
        <LocalContext.Provider value={{clickedLocal, setClickedLocal}}>
            <div className="gallery-top-container" style={{ display:'flex', width:"100%", height:"100%" }}>
              <div style={{ width:"fit-content", height: "fit-content", marginTop:"100px" }}>
                <GalleryMap firstNameList={new Set(firstNameList)} secondNameList={new Set(secondNameList)} ></GalleryMap>
              </div>
              <div className='gallery-city-container'>
                {/* 선택한 지역이 있으면 List출력 */}
                <h1>{selectedCity? selectedCity : clickedLocal}</h1>
                <br />
                {
                  // 선택한 지역이아직 없는경우
                  clickedLocal==null ?
                  <GalleryGuide></GalleryGuide>
                  : 
                  // 선택한 지역에 사진이 없는 경우
                  secondNameList.length>0 ?
                    (
                      // 지역내에서 특정 도시를 선택한 경우 
                      selectedCity==null ?
                      <CityList imgNameList={imgNameList}secondNameList={secondNameList} setSelectedCity={setSelectedCity}></CityList>
                      :
                      <CityGallery imgInfoList={imgInfoList} localName={clickedLocal} cityName={selectedCity}></CityGallery>
                    )
                  :
                  <GallerySearchFail></GallerySearchFail>
                }
              </div>
            </div>
        </LocalContext.Provider>
        <Footer></Footer>
    </>
  );
};


export default Gallery

