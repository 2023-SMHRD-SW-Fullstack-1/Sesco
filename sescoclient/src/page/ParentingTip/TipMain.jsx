import React, { useEffect } from 'react'
import Tip from './components/Tip'
import Banner from './components/Banner'
import './components/Tip.css'
import { useNavigate } from 'react-router'


const TipMain = () => {
  
  const nav = useNavigate();
  const user_id = sessionStorage.getItem('user_id');
  const user_nick = sessionStorage.getItem('user_nick');
  
  const backToMain=()=>{
    nav("/")
  }

  useEffect(()=>{
    if(user_id == null || user_nick == null){
      backToMain()
   }
  },[])

  // 메인에서 아이를 클릭하면 {
    // 세션생성
    // 페이지를 팁 메인으로 이동시켜주는거 
  
 {/*
  const selectedKid = sessionStorage.getItem('kid_seq')

  let user_id = "qwfhqwhfq"
*/} 
  
  return (
    <>
      <Banner user_nick={user_nick}/>
      <Tip user_id={user_id}/>
    </>
  )
}

export default TipMain