import React from 'react'

const CityList = ({imgNameList, secondNameList, setSelectedCity}) => {

    
  //지역 종류
  const secondNameSet = Array.from(new Set(secondNameList))


  return (
    <div>
   
        <input class="toggle-box" id="header2" type="checkbox"/>
        <label for="header2">Salads</label>
        <div class="myBlock">14" Medium Cheese Pizza $9.75 --- Extra Topping $1.75<br/> 16" Large Cheese Pizza $11.25 ---- Extra Topping $2.50</div>

    </div>
  )
}

export default CityList