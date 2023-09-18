import React, { useContext, useEffect } from 'react'
import './gallerymap.css'
import { useState } from 'react'
import {LOCAL} from '../localconstants'
import { LocalContext } from '../localContext'



const GalleryMap = ({hasCity}) => {

  //지역 설정 함수 
  const {clickedLocal, setClickedLocal} = useContext(LocalContext)
  //hover 감지 함수
  const [isHovered, setIsHovered] = useState(false)
  console.log("ee",hasCity)

  //마커 오작동 방지 (빈 값 랜더링 막기 위함)

  //마우스 hover이벤트
  const handleMouseEnter = (it) => {
    console.log(it)
  };

  //마우스 hover종료
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //지역 클릭이벤트 ( 지역 설정하기 )
  const clickLocal = (region) =>{
    setClickedLocal(region)
  }

  return (
    <div className='gallerymap-total-container' style={{display: 'flex', width: '600px', height: '600px'}}>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 60 60">

        <defs>
        {/* 그림자 필터 */}
          <filter id="shadow">
            <feDropShadow dx="1" dy="1" stdDeviation="0.2" floodColor="#03714E" />
          </filter>

        {/* 섬지역 그림자 필터  */}
        <filter id="shadow-island">
          <feDropShadow dx="0.3" dy="0.3" stdDeviation="0.1" floodColor="#03714E" />
        </filter>

        </defs>

        {/* 전국 */}
        {/* <path filter="url(#shadow)" fill="#F11222" stroke='none' d='M 15 11 C 16.3333 12.3333 17.6667 13.6667 19 15 C 18.3333 15 17.6667 15 17 15 C 17 15.6667 17 16.3333 17 17 C 17.3333 17.6667 17.6667 18.3333 18 19 C 17.3333 18.6667 16.6667 18.3333 16 18 C 14.6667 18.3333 13.3333 18.6667 12 19 C 11.6667 19.6667 11.3333 20.3333 11 21 C 12 21.3333 13 21.6667 14 22 C 14.3333 23.3333 14.6667 24.6667 15 26 C 14.6667 26.6667 14.3333 27.3333 14 28 C 14.3333 28.6667 14.6667 29.3333 15 30 C 14.6667 30 14.3333 30 14 30 C 14.3333 30.6667 14.6667 31.3333 15 32 C 15.3333 32.3333 15.6667 32.6667 16 33 C 15.3333 33 14.6667 33 14 33 C 13.3333 33.3333 12.6667 33.6667 12 34 C 12.6667 34.3333 13.3333 34.6667 14 35 C 13.3333 35.3333 12.6667 35.6667 12 36 C 11.3333 36.6667 10.6667 37.3333 10 38 C 10 38.3333 10 38.6667 10 39 C 10 39.3333 10 39.6667 10 40 C 9.6667 41 9.3333 42 9 43 C 8.6667 43.3333 8.3333 43.6667 8 44 C 7.6667 44.6667 7.3333 45.3333 7 46 C 6.3333 46.6667 5.6667 47.3333 5 48 C 5.3333 48.3333 5.6667 48.6667 6 49 C 6.6667 48.6667 7.3333 48.3333 8 48 C 8.6667 48.6667 9.3333 49.3333 10 50 C 11.3333 49.6667 12.6667 49.3333 14 49 C 14.3333 48.3333 14.6667 47.6667 15 47 C 16 46.6667 17 46.3333 18 46 C 17.3333 46.6667 16.6667 47.3333 16 48 C 16.6667 48.6667 17.3333 49.3333 18 50 C 19 49.3333 20 48.6667 21 48 C 20.6667 47.6667 20.3333 47.3333 20 47 C 20 46.6667 20 46.3333 20 46 C 20.6667 46.6667 21.3333 47.3333 22 48 C 22.6667 47.6667 23.3333 47.3333 24 47 C 23.6667 46.3333 23.3333 45.6667 23 45 C 23.6667 45 24.3333 45 25 45 C 25 45.6667 25 46.3333 25 47 C 25.3333 47.3333 25.6667 47.6667 26 48 C 26.6667 47 27.3333 46 28 45 C 29.3333 45.6667 30.6667 46.3333 32 47 C 32.3333 46.6667 32.6667 46.3333 33 46 C 32.3333 45.3333 31.6667 44.6667 31 44 C 32 44.3333 33 44.6667 34 45 C 34 44.6667 34 44.3333 34 44 C 35.3333 44.6667 36.6667 45.3333 38 46 C 39.6667 44.3333 41.3333 42.6667 43 41 C 43.6667 38.6667 44.3333 36.3333 45 34 C 44.6667 34 44.3333 34 44 34 C 44.3333 32.6667 44.6667 31.3333 45 30 C 45 29 45 28 45 27 C 45.3333 26.6667 45.6667 26.3333 46 26 C 46 24.6667 46 23.3333 46 22 C 46 21.6667 46 21.3333 46 21 C 46 20.6667 46 20.3333 46 20 C 45 18.3333 44 16.6667 43 15 C 43.3333 14.6667 43.6667 14.3333 44 14 C 43 12.6667 42 11.3333 41 10 C 41 9.3333 41 8.6667 41 8 C 40.3333 7 39.6667 6 39 5 C 39 4.3333 39 3.6667 39 3 C 38.6667 3 38.3333 3 38 3 C 37.6667 3.3333 37.3333 3.6667 37 4 C 36.3333 4.3333 35.6667 4.6667 35 5 C 31.3333 4.6667 27.6667 4.3333 24 4 C 22.6667 5.6667 21.3333 7.3333 20 9 C 19 9 18 9 17 9 C 16.3333 9.6667 15.6667 10.3333 15 11 M 7 53 C 9 53 11 53 13 53 C 13.6667 53.6667 14.3333 54.3333 15 55 C 14 56 13 57 12 58 C 9.6667 58 7.3333 58 5 58 C 4.3333 57.3333 3.6667 56.6667 3 56 C 3.6667 55.6667 4.3333 55.3333 5 55 C 5.3333 54.3333 5.6667 53.6667 6 53 C 6.6667 53 7.3333 53 8 53 M 50 19 C 50.6667 18.6667 51.3333 18.3333 52 18 C 51.6667 17.6667 51.3333 17.3333 51 17 C 50.3333 17 49.6667 17 49 17 C 49 17.3333 49 17.6667 49 18 C 49.3333 18.3333 49.6667 18.6667 50 19 M 52 20 C 52.3333 19.6667 52.6667 19.3333 53 19 C 53.3333 19.3333 53.6667 19.6667 54 20 C 53.6667 20.3333 53.3333 20.6667 53 21 C 52.6667 20.6667 52.3333 20.3333 52 20'></path> */}

        {/* 섬지역 */}
        <g>
          <path 
            filter="url(#shadow-island)" fill="#F11222" stroke='' strokeWidth={0.3}
            d='M 50 19 C 50.6667 18.6667 51.3333 18.3333 52 18 C 51.6667 17.6667 51.3333 17.3333 51 17 C 50.3333 17 49.6667 17 49 17 C 49 17.3333 49 17.6667 49 18 C 49.3333 18.3333 49.6667 18.6667 50 19 M 52 20 C 52.3333 19.6667 52.6667 19.3333 53 19 C 53.3333 19.3333 53.6667 19.6667 54 20 C 53.6667 20.3333 53.3333 20.6667 53 21 C 52.6667 20.6667 52.3333 20.3333 52 20'
          ></path>
        </g>
        
        {/* 내륙 */}
        <g>
          {/*  C 16.3333 9.6667 15.6667 10.3333 15 11  */}
          <path
            filter="url(#shadow)" fill="#F11222" stroke='' strokeWidth={0.8}
            d='M 7 53 C 9 53 11 53 13 53 C 13.6667 53.6667 14.3333 54.3333 15 55 C 14 56 13 57 12 58 C 9.6667 58 7.3333 58 5 58 C 4.3333 57.3333 3.6667 56.6667 3 56 C 3.6667 55.6667 4.3333 55.3333 5 55 C 5.3333 54.3333 5.6667 53.6667 6 53 C 6.6667 53 7.3333 53 8 53 M 15 11 M 15 11 C 15.3333 11.3333 15.6667 11.6667 16 12 C 16.3333 12 16.6667 12 17 12 C 17.3333 12.6667 17.6667 13.3333 18 14 C 18.3333 14.3333 18.6667 14.6667 19 15 C 16.3333 12.3333 17.6667 13.6667 19 15 C 18.3333 15 17.6667 15 17 15 C 17 15.6667 17 16.3333 17 17 C 17.3333 17.6667 17.6667 18.3333 18 19 C 17.3333 18.6667 16.6667 18.3333 16 18 C 14.6667 18.3333 13.3333 18.6667 12 19 C 11.6667 19.6667 11.3333 20.3333 11 21 C 12 21.3333 13 21.6667 14 22 C 14.3333 23.3333 14.6667 24.6667 15 26 C 14.6667 26.6667 14.3333 27.3333 14 28 C 14.3333 28.6667 14.6667 29.3333 15 30 C 14.6667 30 14.3333 30 14 30 C 14.3333 30.6667 14.6667 31.3333 15 32 C 15.3333 32.3333 15.6667 32.6667 16 33 C 15.3333 33 14.6667 33 14 33 C 13.3333 33.3333 12.6667 33.6667 12 34 C 12.6667 34.3333 13.3333 34.6667 14 35 C 13.3333 35.3333 12.6667 35.6667 12 36 C 11.3333 36.6667 10.6667 37.3333 10 38 C 10 38.3333 10 38.6667 10 39 C 10 39.3333 10 39.6667 10 40 C 9.6667 41 9.3333 42 9 43 C 8.6667 43.3333 8.3333 43.6667 8 44 C 7.6667 44.6667 7.3333 45.3333 7 46 C 6.3333 46.6667 5.6667 47.3333 5 48 C 5.3333 48.3333 5.6667 48.6667 6 49 C 6.6667 48.6667 7.3333 48.3333 8 48 C 8.6667 48.6667 9.3333 49.3333 10 50 C 11.3333 49.6667 12.6667 49.3333 14 49 C 14.3333 48.3333 14.6667 47.6667 15 47 C 16 46.6667 17 46.3333 18 46 C 17.3333 46.6667 16.6667 47.3333 16 48 C 16.6667 48.6667 17.3333 49.3333 18 50 C 19 49.3333 20 48.6667 21 48 C 20.6667 47.6667 20.3333 47.3333 20 47 C 20 46.6667 20 46.3333 20 46 C 20.6667 46.6667 21.3333 47.3333 22 48 C 22.6667 47.6667 23.3333 47.3333 24 47 C 23.6667 46.3333 23.3333 45.6667 23 45 C 23.6667 45 24.3333 45 25 45 C 25 45.6667 25 46.3333 25 47 C 25.3333 47.3333 25.6667 47.6667 26 48 C 26.6667 47 27.3333 46 28 45 C 29.3333 45.6667 30.6667 46.3333 32 47 C 32.3333 46.6667 32.6667 46.3333 33 46 C 32.3333 45.3333 31.6667 44.6667 31 44 C 32 44.3333 33 44.6667 34 45 C 34 44.6667 34 44.3333 34 44 C 35.3333 44.6667 36.6667 45.3333 38 46 C 39.6667 44.3333 41.3333 42.6667 43 41 C 43.6667 38.6667 44.3333 36.3333 45 34 C 44.6667 34 44.3333 34 44 34 C 44.3333 32.6667 44.6667 31.3333 45 30 C 45 29 45 28 45 27 C 45.3333 26.6667 45.6667 26.3333 46 26 C 46 24.6667 46 23.3333 46 22 C 46 21.6667 46 21.3333 46 21 C 46 20.6667 46 20.3333 46 20 C 45 18.3333 44 16.6667 43 15 C 43.3333 14.6667 43.6667 14.3333 44 14 C 43 12.6667 42 11.3333 41 10 C 41 9.3333 41 8.6667 41 8 C 40.3333 7 39.6667 6 39 5 C 39 4.3333 39 3.6667 39 3 C 38.6667 3 38.3333 3 38 3 C 37.6667 3.3333 37.3333 3.6667 37 4 C 36.3333 4.3333 35.6667 4.6667 35 5 C 31.3333 4.6667 27.6667 4.3333 24 4 C 22.6667 5.6667 21.3333 7.3333 20 9 C 19 9 18 9 17 9'
          ></path>
        </g>

        {/* 경기 */}
        <g className={`map-location${clickedLocal===LOCAL.GEYONGGI_DO ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.GEYONGGI_DO)} onMouseEnter={()=>handleMouseEnter(LOCAL.GEYONGGI_DO)} onMouseLeave={handleMouseLeave}>
          <path
            fill='#30CBA5' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
            d='M 24 4 C 26 5.6667 28 7.3333 30 9 C 29.6667 9.3333 29.3333 9.6667 29 10 C 28.6667 10 28.3333 10 28 10 C 28 10.6667 28 11.3333 28 12 C 29 12.6667 30 13.3333 31 14 C 30.3333 15.3333 29.6667 16.6667 29 18 C 27.3333 19 25.6667 20 24 21 C 23.3333 20.3333 22.6667 19.6667 22 19 C 21 19 20 19 19 19 C 18.3333 18.3333 17.6667 17.6667 17 17 C 17 16.3333 17 15.6667 17 15 C 17.6667 15 18.3333 15 19 15 C 18.6667 14.6667 18.3333 14.3333 18 14 C 17.6667 13.3333 17.3333 12.6667 17 12 C 16.6667 12 16.3333 12 16 12 C 15.6667 11.6667 15.3333 11.3333 15 11 C 15.6667 10.3333 16.3333 9.6667 17 9 C 18 9 19 9 20 9 C 21.3333 7.3333 22.6667 5.6667 24 4'
          ></path>
        </g>

        {/* 강원 */}
        {/* d += C 27.6667 4.3333 31.3333 4.6667 35  */}
        <g className={`map-location${clickedLocal ==LOCAL.GANGWON_DO ? "-clicked":""}`} onClick={()=>clickLocal(LOCAL.GANGWON_DO)} onMouseEnter={()=>handleMouseEnter(LOCAL.GANGWON_DO)} onMouseLeave={handleMouseLeave}>
          <path
            fill='#17D095' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
            d='M 24 4 C 24 4 24 4 24 4 C 27.6667 4.3333 31.3333 4.6667 35 5 C 35.6667 4.6667 36.3333 4.3333 37 4 C 37.3333 3.6667 37.6667 3.3333 38 3 C 38.3333 3 38.6667 3 39 3 C 39 3.6667 39 4.3333 39 5 C 39.6667 6 40.3333 7 41 8 C 41 8.6667 41 9.3333 41 10 C 42 11.3333 43 12.6667 44 14 C 43.6667 14.3333 43.3333 14.6667 43 15 C 44 16.6667 45 18.3333 46 20 C 46 20.6667 46 21.3333 46 22 C 43.3333 21.6667 40.6667 21.3333 38 21 C 37 20.3333 36 19.6667 35 19 C 33 18.6667 31 18.3333 29 18 C 29.6667 16.6667 30.3333 15.3333 31 14 C 30 13.3333 29 12.6667 28 12 C 28 11.3333 28 10.6667 28 10 C 28.3333 10 28.6667 10 29 10 C 29.3333 9.6667 29.6667 9.3333 30 9 C 28 7.3333 26 5.6667 24 4 '
          ></path>
        </g>


        {/* 경북 */}
        <g className={`map-location${clickedLocal ==LOCAL.GYEONGSANGBUK_DO ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.GYEONGSANGBUK_DO)} onMouseEnter={()=>handleMouseEnter(LOCAL.GYEONGSANGBUK_DO)} onMouseLeave={handleMouseLeave}>
            <path
              fill='#30CBA5' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
              d='M 46 22 C 43.3333 21.6667 40.6667 21.3333 38 21 C 37.3333 21.3333 36.6667 21.6667 36 22 C 36 22.3333 36 22.6667 36 23 C 35.3333 23 34.6667 23 34 23 C 33.6667 22.6667 33.3333 22.3333 33 22 C 31.6667 22.6667 30.3333 23.3333 29 24 C 29 24.6667 29 25.3333 29 26 C 28.6667 26.6667 28.3333 27.3333 28 28 C 28.6667 28.6667 29.3333 29.3333 30 30 C 29.3333 30.6667 28.6667 31.3333 28 32 C 28 32.3333 28 32.6667 28 33 C 29 34.3333 30 35.6667 31 37 C 32.3333 37.3333 33.6667 37.6667 35 38 C 36.3333 38 37.6667 38 39 38 C 39.3333 37.6667 39.6667 37.3333 40 37 C 41.3333 37.3333 42.6667 37.6667 44 38 C 44.3333 36.6667 44.6667 35.3333 45 34 C 44.6667 34 44.3333 34 44 34 C 44.3333 32.6667 44.6667 31.3333 45 30 C 45 29 45 28 45 27 C 45.3333 26.6667 45.6667 26.3333 46 26 C 46 24.6667 46 23.3333 46 22 C 43.3333 21.6667 40.6667 21.3333 38 21'
            ></path>

          {/* 울릉도/독도 */}
          <path
            fill='#30CBA5' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
            d='M 50 19 C 50.6667 18.6667 51.3333 18.3333 52 18 C 51.6667 17.6667 51.3333 17.3333 51 17 C 50.3333 17 49.6667 17 49 17 C 49 17.3333 49 17.6667 49 18 C 49.3333 18.3333 49.6667 18.6667 50 19 C 50.5903 18.7043 51.2987 18.3637 52.007 18.023 M 52 20 C 52.3333 19.6667 52.6667 19.3333 53 19 C 53.3333 19.3333 53.6667 19.6667 54 20 C 53.6667 20.3333 53.3333 20.6667 53 21 C 52.6667 20.6667 52.3333 20.3333 52 20'
          ></path>
        </g>

        {/* 충북 */}
        <g className={`map-location${clickedLocal ==LOCAL.CHUNGCHEONGBUK_DO ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.CHUNGCHEONGBUK_DO)} onMouseEnter={()=>handleMouseEnter(LOCAL.CHUNGCHEONGBUK_DO)} onMouseLeave={handleMouseLeave}>
          <path
            fill='#10B88D' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
            d='M 24 21 C 24.3333 21.3333 24.6667 21.6667 25 22 C 24.3333 22.3333 23.6667 22.6667 23 23 C 23.6667 23.6667 24.3333 24.3333 25 25 C 24 25.6667 23 26.3333 22 27 C 22 27.3333 22 27.6667 22 28 C 22.3333 28.3333 22.6667 28.6667 23 29 C 22.6667 29.3333 22.3333 29.6667 22 30 C 22.3333 30.3333 22.6667 30.6667 23 31 C 24.6667 31.3333 26.3333 31.6667 28 32 C 28 32 28 32 28 32 C 28.6667 31.3333 29.3333 30.6667 30 30 C 29.3333 29.3333 28.6667 28.6667 28 28 C 28.3333 27.3333 28.6667 26.6667 29 26 C 29 25.3333 29 24.6667 29 24 C 30.3333 23.3333 31.6667 22.6667 33 22 C 33.3333 22.3333 33.6667 22.6667 34 23 C 34.6667 23 35.3333 23 36 23 C 36 22.6667 36 22.3333 36 22 C 36.6667 21.6667 37.3333 21.3333 38 21 C 37 20.3333 36 19.6667 35 19 C 33 18.6667 31 18.3333 29 18 C 27.3333 19 25.6667 20 24 21 C 24.3333 21.3333 24.6667 21.6667 25 22'
          ></path>
        </g>

        {/* 충남 */}
        <g className={`map-location${clickedLocal ==LOCAL.CHUNGCHEONGNAM_DO ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.CHUNGCHEONGNAM_DO)} onMouseEnter={()=>handleMouseEnter(LOCAL.CHUNGCHEONGNAM_DO)} onMouseLeave={handleMouseLeave}>
          <path
            fill='#11C893' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
            d='M 15 30 C 15.3333 30 15.6667 30 16 30 C 16.3333 29.6667 16.6667 29.3333 17 29 C 17.6667 29 18.3333 29 19 29 C 19.3333 29.3333 19.6667 29.6667 20 30 C 20.6667 30 21.3333 30 22 30 C 22.3333 29.6667 22.6667 29.3333 23 29 C 22.6667 28.6667 22.3333 28.3333 22 28 C 22 27.6667 22 27.3333 22 27 C 23 26.3333 24 25.6667 25 25 C 24.3333 24.3333 23.6667 23.6667 23 23 C 23.6667 22.6667 24.3333 22.3333 25 22 C 24 21 23 20 22 19 C 21 19 20 19 19 19 C 18.3333 18.3333 17.6667 17.6667 17 17 C 17.3333 17.6667 17.6667 18.3333 18 19 C 17.3333 18.6667 16.6667 18.3333 16 18 C 14.6667 18.3333 13.3333 18.6667 12 19 C 11.6667 19.6667 11.3333 20.3333 11 21 C 12 21.3333 13 21.6667 14 22 C 14.3333 23.3333 14.6667 24.6667 15 26 C 14.6667 26.6667 14.3333 27.3333 14 28 C 14.3333 28.6667 14.6667 29.3333 15 30 C 15.3333 30 15.6667 30 16 30 C 16.3333 29.6667 16.6667 29.3333 17 29'
          ></path>
        </g>

        {/* 전북 */}
        <g className={`map-location${clickedLocal ==LOCAL.JEOLLABUK_DO ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.JEOLLABUK_DO)} onMouseEnter={()=>handleMouseEnter(LOCAL.JEOLLABUK_DO)} onMouseLeave={handleMouseLeave}>
          <path
            fill='#17D095' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
            d='M 28 32 C 28 32.3333 28 32.6667 28 33 C 27 33.3333 26 33.6667 25 34 C 24.6667 35 24.3333 36 24 37 C 24 37.6667 24 38.3333 24 39 C 23.6667 39.3333 23.3333 39.6667 23 40 C 22.6667 39.6667 22.3333 39.3333 22 39 C 20.6667 39 19.3333 39 18 39 C 17.6667 38.3333 17.3333 37.6667 17 37 C 16.3333 36.6667 15.6667 36.3333 15 36 C 14.3333 36.6667 13.6667 37.3333 13 38 C 12.6667 38 12.3333 38 12 38 C 11.6667 37.6667 11.3333 37.3333 11 37 C 11.3333 36.6667 11.6667 36.3333 12 36 C 12.6667 35.6667 13.3333 35.3333 14 35 C 13.3333 34.6667 12.6667 34.3333 12 34 C 12.6667 33.6667 13.3333 33.3333 14 33 C 14.6667 33 15.3333 33 16 33 C 15.6667 32.6667 15.3333 32.3333 15 32 C 14.6667 31.3333 14.3333 30.6667 14 30 C 14.6667 30 15.3333 30 16 30 C 16.3333 29.6667 16.6667 29.3333 17 29 C 17.6667 29 18.3333 29 19 29 C 19.3333 29.3333 19.6667 29.6667 20 30 C 20.6667 30 21.3333 30 22 30 C 22.3333 30.3333 22.6667 30.6667 23 31 C 24.6667 31.3333 26.3333 31.6667 28 32 C 28 32.3333 28 32.6667 28 33 C 28 33 28 33 28 33'
          ></path>
        </g>

        {/* 전남 */}
        <g className={`map-location${clickedLocal ==LOCAL.JEOLLANAM_DO ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.JEOLLANAM_DO)} onMouseEnter={()=>handleMouseEnter(LOCAL.JEOLLANAM_DO)} onMouseLeave={handleMouseLeave}>
          
         
          <path
            fill='#10B88D' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
            d='M 23 40 C 23.3333 41.6667 23.6667 43.3333 24 45 C 23.6667 45 23.3333 45 23 45 C 23.3333 45.6667 23.6667 46.3333 24 47 C 23.3333 47.3333 22.6667 47.6667 22 48 C 21.3333 47.3333 20.6667 46.6667 20 46 C 20 46.3333 20 46.6667 20 47 C 20.3333 47.3333 20.6667 47.6667 21 48 C 20 48.6667 19 49.3333 18 50 C 17.3333 49.3333 16.6667 48.6667 16 48 C 16.6667 47.3333 17.3333 46.6667 18 46 C 17 46.3333 16 46.6667 15 47 C 14.6667 47.6667 14.3333 48.3333 14 49 C 12.6667 49.3333 11.3333 49.6667 10 50 C 9.3333 49.3333 8.6667 48.6667 8 48 C 7.3333 48.3333 6.6667 48.6667 6 49 C 5.6667 48.6667 5.3333 48.3333 5 48 C 5.6667 47.3333 6.3333 46.6667 7 46 C 7.3333 45.3333 7.6667 44.6667 8 44 C 8.3333 43.6667 8.6667 43.3333 9 43 C 9.3333 42 9.6667 41 10 40 C 10 39.3333 10 38.6667 10 38 C 10.3333 37.6667 10.6667 37.3333 11 37 C 11.3333 37.3333 11.6667 37.6667 12 38 C 12.6667 38 12.3333 38 13 38 C 13.3333 37.3333 14.6667 36.6667 15 36 C 15.6667 36.3333 16.3333 36.6667 17 37 C 17.3333 37.6667 17.6667 38.3333 18 39 C 19.3333 39 20.6667 39 22 39 C 22.3333 39.3333 22.6667 39.6667 23 40 C 23.3333 41.6667 23.6667 43.3333 24 45'
          ></path>
        </g>

        {/* 경남 */}
        <g className={`map-location${clickedLocal ==LOCAL.GYEONGSANGNAM_DO ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.GYEONGSANGNAM_DO)} onMouseEnter={()=>handleMouseEnter(LOCAL.GYEONGSANGNAM_DO)} onMouseLeave={handleMouseLeave}>
          <path
            fill='#11C893' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
            d='M 23 40 C 23.3333 39.6667 23.6667 39.3333 24 39 C 24 38 24 37 24 36 C 24.3333 35.3333 24.6667 34.6667 25 34 C 26 33.6667 27 33.3333 28 33 C 29 34.3333 30 35.6667 31 37 C 32.3333 37.3333 33.6667 37.6667 35 38 C 36.3333 38 37.6667 38 39 38 C 39.3333 37.6667 39.6667 37.3333 40 37 C 41.3333 37.3333 42.6667 37.6667 44 38 C 43.6667 39 43.3333 40 43 41 C 41.3333 42.6667 39.6667 44.3333 38 46 C 36.6667 45.3333 35.3333 44.6667 34 44 C 34 44.3333 34 44.6667 34 45 C 33 44.6667 32 44.3333 31 44 C 31.6667 44.6667 32.3333 45.3333 33 46 C 32.6667 46.3333 32.3333 46.6667 32 47 C 30.6667 46.3333 29.3333 45.6667 28 45 C 27.3333 46 26.6667 47 26 48 C 25.6667 47.6667 25.3333 47.3333 25 47 C 25 46.3333 25 45.6667 25 45 C 24.6667 45 24.3333 45 24 45 C 23.6667 43.3333 23.3333 41.6667 23 40 C 23.3333 39.6667 23.6667 39.3333 24 39'
          ></path>
        </g>

        {/* 제주 */}
        <g className={`map-location${clickedLocal ==LOCAL.JEJU_ISLAND ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.JEJU_ISLAND)} onMouseEnter={()=>handleMouseEnter(LOCAL.JEJU_ISLAND)} onMouseLeave={handleMouseLeave}>
          <path
            fill='#11C893' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
            d='M 7 53 C 9 53 11 53 13 53 C 13.6667 53.6667 14.3333 54.3333 15 55 C 14 56 13 57 12 58 C 9.6667 58 7.3333 58 5 58 C 4.3333 57.3333 3.6667 56.6667 3 56 C 3.6667 55.6667 4.3333 55.3333 5 55 C 5.3333 54.3333 5.6667 53.6667 6 53 C 6.6667 53 7.3333 53 8 53'
          ></path>
        </g>


        {/*~~특별시~~ */}
          {/* 광주 */}
        <g className={`map-location${clickedLocal ==LOCAL.GWANGJU ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.GWANGJU)} onMouseEnter={()=>handleMouseEnter(LOCAL.GWANGJU)} onMouseLeave={handleMouseLeave}>
          <path
            fill='#11C893' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
            d=' M 13 40 C 13.3333 40.3333 13.6667 40.6667 14 41 C 14.6667 40.6667 15.3333 40.3333 16 40 C 16.3333 40.6667 16.6667 41.3333 17 42 C 17.3333 42 17.6667 42 18 42 C 17.3333 42.6667 16.6667 43.3333 16 44 C 15.3333 44 14.6667 44 14 44 C 13.6667 44 13.3333 44 13 44 C 12.6667 43.6667 12.3333 43.3333 12 43 C 11.6667 43 11.3333 43 11 43 C 11.3333 42.3333 11.6667 41.6667 12 41 C 12.3333 40.6667 12.6667 40.3333 13 40'
          ></path>
        </g> 


          {/* 울산 */}
        <g className={`map-location${clickedLocal ==LOCAL.ULSAN ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.ULSAN)} onMouseEnter={()=>handleMouseEnter(LOCAL.ULSAN)} onMouseLeave={handleMouseLeave}>  
          <path
            fill='#11C893' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
            d='M 39 38 C 38.6667 38.3333 38.3333 38.6667 38 39 C 38.3333 39.3333 38.6667 39.6667 39 40 C 39.6667 40.3333 40.3333 40.6667 41 41 C 41.3333 41.3333 41.6667 41.6667 42 42 C 42.3333 41.6667 42.6667 41.3333 43 41 C 43.3333 40 43.6667 39 44 38 C 42.6667 37.6667 41.3333 37.3333 40 37 C 39.3333 37.6667 38.6667 38.3333 38 39 '
          ></path>
       </g>

        {/* 부산 */}
       <g className={`map-location${clickedLocal ==LOCAL.BUSAN ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.BUSAN)} onMouseEnter={()=>handleMouseEnter(LOCAL.BUSAN)} onMouseLeave={handleMouseLeave}>
          <path
            fill='#11C893' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
            d='M 36 45 C 35.6667 44.6667 35.3333 44.3333 35 44 C 35.3333 43.6667 35.6667 43.3333 36 43 C 36.6667 43 37.3333 43 38 43 C 38.3333 42.6667 38.6667 42.3333 39 42 C 39 41.6667 39 41.3333 39 41 C 39.3333 41 39.6667 41 40 41 C 40.3333 41 40.6667 41 41 41 C 41.3333 41.3333 41.6667 41.6667 42 42 C 40.6667 43.3333 39.3333 44.6667 38 46 C 37.3333 45.6667 36.6667 45.3333 36 45 C 35.6667 44.6667 35.3333 44.3333 35 44'
          ></path>
        </g>

        {/* 대구 */}
        {/* <g className={`map-location${clickedLocal ==LOCAL.DAEGU ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.DAEGU)} onMouseEnter={()=>handleMouseEnter(LOCAL.DAEGU)} onMouseLeave={handleMouseLeave}>
        <path
            fill='#11C893' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
            d=' M 32 37 C 32 37 32 37 32 37 C 31.6667 36.6667 31.3333 36.3333 31 36 C 31.6667 35.6667 32.3333 35.3333 33 35 C 32.6667 34.6667 32.3333 34.3333 32 34 C 33.3333 33.3333 34.6667 32.6667 36 32 C 36.3333 32.6667 36.6667 33.3333 37 34 C 36.3333 34.6667 35.6667 35.3333 35 36 C 34.6667 36 34.3333 36 34 36 C 34 36.6667 34 37.3333 34 37 C 33.3333 37.6667 32.6667 37.3333 32 37  C 31.6667 36.6667 31.3333 36.3333 31 36'
          ></path> 
        </g> */}
        <g className={`map-location${clickedLocal ==LOCAL.DAEGU ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.DAEGU)} onMouseEnter={()=>handleMouseEnter(LOCAL.DAEGU)} onMouseLeave={handleMouseLeave}>
        <path
            fill='#11C893' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
            d='  M 31 37 C 31.3333 37 31.6667 37 32 37 C 32.3333 36.6667 32.6667 36.3333 33 36 C 33.3333 36 33.6667 36 34 36 C 34 35.6667 34 35.3333 34 35 C 34.3333 34.6667 34.6667 34.3333 35 34 C 34.6667 33.6667 34.3333 33.3333 34 33 C 34 32.6667 34 32.3333 34 32 C 34.6667 31.6667 35.3333 31.3333 36 31 C 35 30.6667 34 30.3333 33 30 C 32.3333 30 31.6667 30 31 30 C 31.3333 30.3333 31.6667 30.6667 32 31 C 32.3333 31.6667 32.6667 32.3333 33 33 C 32.6667 33.3333 32.3333 33.6667 32 34 C 31.6667 34 31.3333 34 31 34 C 31.3333 34.3333 31.6667 34.6667 32 35 C 31.6667 35.3333 31.3333 35.6667 31 36 C 30.6667 36 30.3333 36 30 36 C 30.3333 36.3333 30.6667 36.6667 31 37 C 31.3333 37 31.6667 37 32 37'
          ></path> 
        </g>

        {/* 대전 */}
        <g className={`map-location${clickedLocal ==LOCAL.DAEJEON ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.DAEJEON)} onMouseEnter={()=>handleMouseEnter(LOCAL.DAEJEON)} onMouseLeave={handleMouseLeave}>
          <path
              fill='#11C893' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
              d=' M 25 25 C 25 25.3333 25 25.6667 25 26 C 25.3333 26.3333 25.6667 26.6667 26 27 C 25.6667 27.6667 25.3333 28.3333 25 29 C 24.6667 28.6667 24.3333 28.3333 24 28 C 23.6667 28.3333 23.3333 28.6667 23 29 C 22.6667 28.6667 22.3333 28.3333 22 28 C 22 27.6667 22 27.3333 22 27 C 23 26.3333 24 25.6667 25 25 C 25 25.3333 25 25.6667 25 26'
          ></path>
        </g>

        {/* 세종 */}
        <g className={`map-location${clickedLocal ==LOCAL.SEJONG ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.SEJONG)} onMouseEnter={()=>handleMouseEnter(LOCAL.SEJONG)} onMouseLeave={handleMouseLeave}>
          <path
              fill='#11C893' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
              d='M 23.5 26 C 23.3333 26 22.6667 26 22 26 C 22 25.6667 22 25.3333 22 25 C 22.3333 24.444 22.444 24 22.5 24 C 22.5 24 22.3333 23.3333 22 23 C 22 22.6667 22 22.3333 22 22 C 21.6667 21.6667 21.3333 21.3333 21.2 21 C 22 21.3333 23 21.6667 24 22 C 24 22.3333 23.8 22.6667 23.9 22.48 C 22.4 23.2 23.3333 23 23 23 C 23.6667 23.6667 24.3333 24.3333 25 25 C 24.6667 25.333 24 25.777 23.5 26 C 23.5 26 22.6667 26 22 26 '
          ></path>
        </g>

          {/* 인천 */}
        <g className={`map-location${clickedLocal ==LOCAL.INCHEON ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.INCHEON)} onMouseEnter={()=>handleMouseEnter(LOCAL.INCHEON)} onMouseLeave={handleMouseLeave}>
          <path
              fill='#11C893' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
              d='M 17 9 C 17 10 17 11 17 12 C 17.6667 11.6667 18.3333 11.3333 19 11 C 19.3333 11.6667 19.6667 12.3333 20 13 C 19.6667 13.6667 19.3333 14.3333 19 15 C 18.6667 14.6667 18.3333 14.3333 18 14 C 17.6667 13.3333 17.3333 12.6667 17 12 C 16.6667 12 16.3333 12 16 12 C 15.6667 11.6667 15.3333 11.3333 15 11 C 15.6667 10.3333 16.3333 9.6667 17 9 C 17 10 17 11 17 12'
          ></path>
        </g>

          {/* 서울 */}
        <g className={`map-location${clickedLocal ==LOCAL.SEOUL ? "-clicked":"" }`} onClick={()=>clickLocal(LOCAL.SEOUL)} onMouseEnter={()=>handleMouseEnter(LOCAL.SEOUL)} onMouseLeave={handleMouseLeave}>
          <path
              fill='#11C893' className='location' strokeLinejoin="round" stroke='green' strokeWidth={0.1}
              d='M 20 13 C 20.3333 12.6667 20.6667 12.3333 21 12 C 21.3333 12.3333 21.6667 12.6667 22 13 C 22.3333 12.3333 22.6667 11.6667 23 11 C 23.3333 11 23.6667 11 24 11 C 24.3333 11.6667 24.6667 12.3333 25 13 C 24.6667 13.6667 24.3333 14.3333 24 15 C 23.3333 15 22.6667 15 22 15 C 21.6667 14.6667 21.3333 14.3333 21 14 C 21 13.6667 21 13.3333 21 13 C 20.6667 13 20.3333 13 20 13 C 20.3333 12.6667 20.6667 12.3333 21 12'
          ></path>
        </g>
        
      </svg>
    
    {/* 지역별 마커 표시여부  */}
    
        {hasCity.has(LOCAL.GWANGJU) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}}/>}
  
        
        {hasCity?.has(LOCAL.GANGWON_DO) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}} />}

         {hasCity.has(LOCAL.GYEONGSANGBUK_DO) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}} />}

         {hasCity.has(LOCAL.CHUNGCHEONGBUK_DO) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}} />}

        {hasCity.has(LOCAL.CHUNGCHEONGNAM_DO) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}} />}

        {hasCity.has(LOCAL.JEOLLABUK_DO) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}} />}

        {hasCity.has(LOCAL.JEOLLANAM_DO) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}}/>}

        {hasCity.has(LOCAL.GYEONGSANGNAM_DO) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}} />}

        {hasCity.has(LOCAL.JEJU_ISLAND) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}} />}

        {hasCity.has(LOCAL.JEJU_ISLAND) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}} />}

        {hasCity.has(LOCAL.JEJU_ISLAND) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}} />}

        {hasCity.has(LOCAL.JEJU_ISLAND) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}} />}

        {hasCity.has(LOCAL.JEJU_ISLAND) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}} />}

        {hasCity.has(LOCAL.JEJU_ISLAND) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}} />}

        {hasCity.has(LOCAL.JEJU_ISLAND) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}} />}

        {hasCity.has(LOCAL.JEJU_ISLAND) && <img src='galleryimg/marked.png' style={{width:"50px", height:"50px", position:"absolute"}} />} 


        {/* GANGWON_DO : "강원도",
    GEYONGGI_DO : "경기도",
    GYEONGSANGNAM_DO : "경상남도",
    GYEONGSANGBUK_DO : "경상북도",
    JEOLLANAM_DO : "전라남도",
    JEOLLABUK_DO : "전라북도",
    JEJU_ISLAND : "제주도",
    CHUNGCHEONGNAM_DO : "충청남도",
    CHUNGCHEONGBUK_DO : "충청북도",
    GWANGJU : "광주광역시",
    BUSAN : "부산광역시",
    ULSAN : "울산광역시",
    DAEGU : "대구광역시",
    DAEJEON : "대전광역시",
    SEOUL :"서울특별시",
    INCHEON :"인천광역시",
    SEJONG :"세종특별자치시" */}
    
    </div>
  )
}

export default GalleryMap