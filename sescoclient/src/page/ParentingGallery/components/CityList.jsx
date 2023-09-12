import City from './City'
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './city.css'

const CityList = ({secondNameList}) => {

  const secondNameSet = Array.from(new Set(secondNameList))



  var settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 3,
    initialSlide: 1, // 시작 위치를 2번 슬라이드로 설정
  };
  return (
    <>
    <div className='slider-container'>
        <Slider {...settings}>
          {secondNameSet.map((name)=>
              <City cityName={name}/>
          )}
        </Slider>
    </div>
    </>
  )
}

export default CityList
