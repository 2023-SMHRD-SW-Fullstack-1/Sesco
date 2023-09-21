import React from 'react'
import './city.css'


const City = ({imgNameList, cityName, cityList, setSelectedCity}) => {

  //사진 포함하고 있는 개수
  const matchCityCount = cityList.filter((name)=>name == cityName).length

  //가장 최근 사진 하나 뽑기
  const firstImgIndex = findFirstIndex(cityList, cityName); 
  const preImgName = imgNameList[firstImgIndex];
  console.log(preImgName)

  
  function findFirstIndex(arr, value) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        return i;
      }
    }
    return -1; // 값이 없는 경우 -1 반환
  }
//  onClick={()=>setSelectedCity(cityName)}
// src={`data:image/jpeg;base64,${preImgName}`}

  return (
    <>
    <div className='city-toggle-container'   onClick={()=>setSelectedCity(cityName)}>
        <img className='toggle-header-image' src={`data:image/jpeg;base64,${preImgName}`}></img>    
        <h2 className='header-city-name'>{cityName}</h2>
        <svg xmlns="http://www.w3.org/2000/svg"  className='header-gallery-button'  width="45" height="45" fill="white" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
        </svg>
        {/* <button className='header-gallery-button' onClick={()=>setSelectedCity(cityName)} variant="primary">갤러리 탐색</button> */}
    </div>
    </>
  )
}

export default City