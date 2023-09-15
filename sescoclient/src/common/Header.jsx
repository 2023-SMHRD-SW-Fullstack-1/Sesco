import React, { useState } from 'react'
import logo from "../img/babyslogo.png";
import tab1 from "../img/tab1.png";
import tab2 from "../img/tab2.png";
import tab3 from "../img/tab3.png";
import tab4 from "../img/tab4.png";
import styled from "styled-components";
import { GoPerson, GoPersonAdd } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [log, setLog] = useState('로그인');
  const [clickHome, setClickHome] = useState(true);
  const [menuContext, setMenuContext] = useState('');
  const [clickTip, setClickTip] = useState(false);
  const [clickNote, setClickNote] = useState(false);
  const [clickGallery, setClickGallery] = useState(false);

  const nav = useNavigate();
  const user_id = sessionStorage.getItem('user_id');
  // 로고 눌렀을때 메인 이동(로그인 했을때/ 로그인 안했을때)
  const handleClickLogo = () => {
    if (!user_id) {
      nav('/')
    } else {
      nav('/main')
      setClickHome(true)
      setClickTip(false)
      setClickNote(false)
      setClickGallery(false)

    }
  }

  const handleClickMenu = (menu) => {
    nav('/main')
    if (menu === 'home') {
      setClickHome(true)
      setClickTip(false)
      setClickNote(false)
      setClickGallery(false)
      nav('/main')
    } else if (menu === 'tip') {
      setClickTip(true)
      setClickHome(false)
      setClickNote(false)
      setClickGallery(false)
      nav('/tip')
    } else if (menu === 'note') {
      setClickNote(true)
      setClickHome(false)
      setClickTip(false)
      setClickGallery(false)
      nav('/note')
    } else if (menu === 'gallery') {
      setClickGallery(true)
      setClickHome(false)
      setClickTip(false)
      setClickNote(false)
      nav('/gallery')
    }


    if (menuContext != null) {
      setMenuContext(menu)
    } else {
      setClickHome(false)
      setClickTip(false)
      setClickNote(false)
      setClickGallery(false)

    }

  }



  return (
    <div>
      <HeaderLogoContainer>
        <HeaderImgLogo src={logo} onClick={() => handleClickLogo()} />
        <HeaderLJContainer>
          {!user_id ?
            <div>

              <HeaderLJTxt href='/login'><GoPerson />로그인 </HeaderLJTxt>
              <HeaderLJTxt href='/join'><GoPersonAdd /> 회원가입</HeaderLJTxt>
            </div>
            :
            <HeaderLJTxt href='/login'><GoPerson />로그아웃 </HeaderLJTxt>

          }
        </HeaderLJContainer>
      </HeaderLogoContainer>
      {user_id ?
        <HeaderTabContainer>
          <HeaderTabImgLogo src={tab1} home={clickHome} onClick={() => handleClickMenu('home')} />
          <HeaderMenuContextMain home={clickHome} onClick={() => handleClickMenu('home')}>홈</HeaderMenuContextMain>
          <HeaderTabImgLogo src={tab2} tip={clickTip} onClick={() => handleClickMenu('tip')} />
          <HeaderMenuContextTip tip={clickTip} onClick={() => handleClickMenu('tip')}>육아 TIP</HeaderMenuContextTip>
          <HeaderTabImgLogo src={tab3} note={clickNote} onClick={() => handleClickMenu('note')} />
          <HeaderMenuContextNote note={clickNote} onClick={() => handleClickMenu('note')}>수첩</HeaderMenuContextNote>
          <HeaderTabImgLogo src={tab4} gallery={clickGallery} onClick={() => handleClickMenu('gallery')} />
          <HeaderMenuContextGallery gallery={clickGallery} onClick={() => handleClickMenu('gallery')}>갤러리</HeaderMenuContextGallery>


        </HeaderTabContainer>
        :
        ""
      }

    </div>
  )
}
const HeaderMenuContextMain = styled.span`
position: absolute;
margin-left:62px;
margin-top: 7px;
font-weight: 900;
font-size: 15px;
color: ${({home})=>home?'rgb(194, 126, 0)':'rgb(121, 121, 121)'};
cursor:pointer;
`;
const HeaderMenuContextTip = styled.span`
position: absolute;
margin-left: 203px;
margin-top:8px;
font-weight: 900;
font-size: 15px;
color: ${({tip})=>tip?'rgb(150, 53, 53)':'rgb(121, 121, 121)'};
cursor:pointer;

`;
const HeaderMenuContextNote = styled.span`
position: absolute;
margin-left: 373px;
margin-top: 8px;
font-weight: 900;
font-size: 15px;
color: ${({note})=>note?'rgb(52, 74, 145)':'rgb(121, 121, 121)'};
cursor:pointer;
`;
const HeaderMenuContextGallery = styled.span`
position: absolute;
margin-left: 529px;
margin-top: 8px;
font-weight: 900;
font-size: 15px;
color: ${({gallery})=>gallery?'rgb(50, 80, 17)':'rgb(121, 121, 121)'};
cursor:pointer;
`;



const HeaderLogoContainer = styled.div`
display: flex;
justify-content: space-between;
position: relative;
`;
const HeaderTabContainer = styled.div`
display: flex;
justify-content: start;
position: relative;
top:2px;
`;
const HeaderImgLogo = styled.img`
width:65px;
margin:10px;
cursor:pointer;
`;
const HeaderTabImgLogo = styled.img`
width:110px;
    
margin-right:35px;
height:40px;
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