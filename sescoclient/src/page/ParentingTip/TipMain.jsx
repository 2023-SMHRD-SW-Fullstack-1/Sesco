import React from 'react'
import Tip from './components/Tip'
import Banner from './components/Banner'
import './components/Tip.css'


const TipMain = () => {
  
  const user_id = sessionStorage.getItem('user_id');

  // 메인에서 아이를 클릭하면 {
    // 세션생성
    // 페이지를 팁 메인으로 이동시켜주는거 
  
 {/*
  const selectedKid = sessionStorage.getItem('kid_seq')

  let user_id = "qwfhqwhfq"
*/} 
  
  return (
    <>
      <Banner user_id={user_id}/>
      <Tip user_id={user_id}/>
    </>
  )
}

export default TipMain