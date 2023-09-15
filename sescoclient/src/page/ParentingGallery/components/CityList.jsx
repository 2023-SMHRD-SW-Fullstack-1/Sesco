import City from './City'
import React, { Component, useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './city.css'
import { LocalContext } from '../localContext';

const CityList = ({secondNameList, setSelectedCity}) => {

  //지역 종류
  const secondNameSet = Array.from(new Set(secondNameList))

  //지역별 데이터 개수
  

  //지역업데이트에 따른 
  const {clickedLocal} = useContext(LocalContext)


  const sliderRef = useRef(0);

  //슬라이드 위치 초기화
  useEffect(() => {
    sliderRef.current.slickGoTo(0) // 0 페이지로 이동
  }, [clickedLocal]);


 

  const settings = {
    
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows :true,
    responsive: [
      { breakpoint: 1600, // 화면의 넓이가 600px 이상일 때
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
      }},
      { breakpoint: 1200, // 화면의 넓이가 320px 이상일 때
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }}
    ]
  }


  return (
    <>
    <div className='slider-container'>
        <Slider ref={sliderRef} {...settings}>
          {/* 중복x 지역들 card로 표시 */}
          {secondNameSet.map((name)=>
          <div key={name} className='slider-item'>
              <City key={name} cityName={name} cityList={secondNameList} setSelectedCity={setSelectedCity}/>
          </div>
          )}
        </Slider>
    </div>
    </>
  )
}

export default CityList
