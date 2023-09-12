import React, { useEffect, useState } from 'react'
import './cardslider.css'
import City from './City'

const CardSlider = ({itemList}) => {

  const [onNumber, setOnNumber] = useState(1)
  const [onList, setOnList] = useState([])
  console.log("살려ㅑ줘")
  console.log(itemList)

  useEffect(()=>{
    if (itemList.length >= 3) {
      // itemList의 길이가 3 이상인 경우에만 slice를 사용
      const filteredList = itemList.slice(1, 3);
      setOnList(filteredList);
    } else {
      // itemList의 길이가 3 미만인 경우에는 그대로 할당
      setOnList(itemList);
    }
  },[])

  useEffect(()=>{
    if (onNumber <= itemList.length-3) {
      // itemList의 길이가 3 이상인 경우에만 slice를 사용
      const filteredList = itemList.slice(onNumber, onNumber+3);
      setOnList(filteredList);
    } else {
      setOnList(itemList.slice(onNumber, itemList.length));
    }
  },[onNumber, itemList])

  return (
  <>
  <div className='slider-city-box'>
      <button onClick={() => setOnNumber(onNumber - 1)}>Previous</button>
      <div className='slider-content'>
        {onList.map((index) => (
          <div key={index}>
            <City/>
          </div>
        ))}
      </div>
      <button onClick={() => setOnNumber(onNumber + 1)}>Next</button>
    </div>
  
  </>
  )
}

export default CardSlider