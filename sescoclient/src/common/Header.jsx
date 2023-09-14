import React from 'react'
import logo from "../img/babyslogo.png";
import tab1 from "../img/tab1.png";
import tab2 from "../img/tab2.png";
import tab3 from "../img/tab3.png";
import tab4 from "../img/tab4.png";
import styled from "styled-components";
import { GoPerson,GoPersonAdd } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const nav = useNavigate();
  return (
    <div>
      <HeaderLogoContainer>
        <HeaderImgLogo src={logo} onClick={()=>nav('/')}/>
        <HeaderLJContainer>
          <HeaderLJTxt href='/login'><GoPerson/> 로그인</HeaderLJTxt>
          <HeaderLJTxt href='/join'><GoPersonAdd/> 회원가입</HeaderLJTxt>
        </HeaderLJContainer>
      </HeaderLogoContainer>

      <HeaderTabContainer>
        <HeaderTabImgLogo src={tab1}/>
        
        <HeaderTabImgLogo src={tab2}/>
        <HeaderTabImgLogo src={tab3}/>
        <HeaderTabImgLogo src={tab4}/>
        
      </HeaderTabContainer>
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
margin:10px
`;
const HeaderTabImgLogo = styled.img`
width:110px;
margin-right:20px;
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