
import React, { useState, useEffect } from 'react'
import './gallery.css'
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
  
  //사진을 보유한 도시 분류
  const [hasCity, setHasCity] = useState(new Set([]))
  
  useEffect(() => {
    //회원정보가 있는지 확인하기
    //세션에서 회원정보 가져오기 ->null 오류처리 할것
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
  
  //이미지 정보가 update되면 보유한 지역도 동기화
  //* 사실상 초기 설정 이후에 변동되지 않음
  useEffect(()=>{
    const tempCityList = imgInfoList.map((info)=>(info.firstName))
    setHasCity(new Set([...tempCityList]))
  },[imgInfoList])

  
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
    console.log("qweqwewq", hasCity.has("광주광역시"))
  },[clickedLocal])
  
  return (
    <>
      <Banner/>
        <LocalContext.Provider value={{clickedLocal, setClickedLocal}}>
            <div className="gallery-top-container" style={{ display:'flex', width:"100%", height:"900px", marginTop:'20px'}}>
              <div style={{height: "fit-content"}}>
                {hasCity && <GalleryMap hasCity={hasCity} ></GalleryMap>}
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
                      <CityGallery imgInfoList={imgInfoList} localName={clickedLocal} cityName={selectedCity} setSelectedCity={setSelectedCity}></CityGallery>
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

