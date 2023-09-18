import React, { useContext } from 'react'
import { LocalContext } from '../localContext';
import City from './City'
import './city.css'

const CityList = ({imgNameList, secondNameList, setSelectedCity}) => {

    
  //지역 종류
  const secondNameSet = Array.from(new Set(secondNameList))

  //지역업데이트에 따른 
  const {clickedLocal} = useContext(LocalContext)

  return (
    <div className='toggle-list-item'>
        {secondNameSet.map((name)=>
            <div key={name}>
                <City key={name} imgNameList={imgNameList} cityName={name} cityList={secondNameList} setSelectedCity={setSelectedCity}/>
            </div>
          )}
    </div>
  )
}

export default CityList