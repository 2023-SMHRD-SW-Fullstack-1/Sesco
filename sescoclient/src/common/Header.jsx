import React, { useState } from 'react'
import logo from "../img/babyslogo.png";
import tab1 from "../img/tab1.png";
import tab2 from "../img/tab2.png";
import tab3 from "../img/tab3.png";
import tab4 from "../img/tab4.png";
import styled from "styled-components";
import { GoPerson,GoPersonAdd } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [log,setLog] = useState('로그인');
  const nav = useNavigate();
  const user_id = sessionStorage.getItem('user_id');
  // 로고 눌렀을때 메인 이동(로그인 했을때/ 로그인 안했을때)
  const handleClickLogo=()=>{
    if(!user_id){
      nav('/')
    }else{
      nav('/main')
      
    }
  }

  return (
    <div>
      <HeaderLogoContainer>
        <HeaderImgLogo src={logo} onClick={()=>handleClickLogo()}/>
        <HeaderLJContainer>
          {!user_id? 
          <div>

          <HeaderLJTxt href='/login'><GoPerson/>로그인 </HeaderLJTxt>
          <HeaderLJTxt href='/join'><GoPersonAdd/> 회원가입</HeaderLJTxt>
          </div>
          :
          <HeaderLJTxt href='/login'><GoPerson/>로그아웃 </HeaderLJTxt>
          
          }
        </HeaderLJContainer>
      </HeaderLogoContainer>
{user_id? 
  <HeaderTabContainer>
        <HeaderTabImgLogo src={tab1} onClick={()=>nav('/main')}/>
        <HeaderTabImgLogo src={tab2} onClick={()=>nav('/tip')}/>
        <HeaderTabImgLogo src={tab3} onClick={()=>nav('/note')}/>
        <HeaderTabImgLogo src={tab4} onClick={()=>nav('/gallery')}/>
        
      </HeaderTabContainer>
      :
      ""
 }
      
    </div>
  )
}

const HeaderLogoContainer = styled.div`
display: flex;
justify-content: space-between;
`;
const HeaderTabContainer = styled.div`
display: flex;
justify-content: start;
`;
const HeaderImgLogo = styled.img`
width:65px;
margin:10px;
cursor:pointer;
`;
const HeaderTabImgLogo = styled.img`
width:110px;
margin-right:20px;
cursor:pointer;
margin-left : 15px;
`;
const HeaderLJContainer = styled.div`
margin-top:22px;
`;
const HeaderLJTxt = styled.a`
margin-right:30px;
color: gray;
text-decoration: none;
`;



export default Header