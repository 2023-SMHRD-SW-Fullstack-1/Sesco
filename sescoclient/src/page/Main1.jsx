import React, { useEffect, useState } from 'react'
import main3Img from '../img/main1/maintest2.jpg'
import bookIcon from '../img/main1/main1_bookIcon.png'
import tipIcon from '../img/main1/main1_TipIcon.png'
import galleryIcon from '../img/main1/main1_galleryIcon.png'
import avatarImg from '../img/main1/main1_avatarImg.png'
import { Link } from 'react-scroll';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import HTMLFlipBook from "react-pageflip";
import testImg from '../img/main1/testImg.png'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from 'react-bootstrap/Button';
import './Main1.scss'
import LoginFrom from '../components/LoginFrom'
import MainMenu from './MainMenu'


// 메인 갤러리 설명란 책 클래스
const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <p>{props.children}</p>
      <p className='main1_page_number'>{props.number}</p>
    </div>
  );
});

//메인
const Main1 = () => {
// 슬라이드 버튼
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  // Tip 설명란 슬라이드 왼쪽 오른쪽 버튼
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

// slick slide 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,



  };

  const nav = useNavigate();
  // 미니 아이콘 클릭 체크 
  const [bookIconClick,setBookIconClick] =useState(false);
  const [galleryIconClick,setGalleryIconClick] =useState(false);
  const [tipIconClick,setTipIconClick] =useState(false);

  // 로그인 버튼 클릭 체크 
  const [loginClick,setLoginClick]=useState(false);


const handleMiniIconsClicked=(item)=>{
  switch (item) {
    case 'book':
      setBookIconClick(true);
      setGalleryIconClick(false);
      setTipIconClick(false);
      break;
    case 'gallery':
      setGalleryIconClick(true);
      setBookIconClick(false);
      setTipIconClick(false);
      break;
    case 'tip':
      setTipIconClick(true);
      setGalleryIconClick(false);
      setBookIconClick(false);
      break;
  }
}

const handleLoginBtnClick =()=>{
  setLoginClick(!loginClick);
  console.log('로그인 버튼' , loginClick);
}

console.log('book',bookIconClick, 'gallery',galleryIconClick,'tip',tipIconClick);



const [isMenuVisible, setIsMenuVisible] = useState(false);
const [menuFixed, setMenuFixed] = useState(false);

// 스크롤 감지 -메뉴버튼
useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition >= 1335 && scrollPosition<=2097) {
      setIsMenuVisible(true);
      setMenuFixed(false)
      console.log('현재 스크롤',window.scrollY,'픽스',menuFixed,'메뉴',isMenuVisible);
    } else if(scrollPosition>2097){
      setIsMenuVisible(true);
      setMenuFixed(true)
      console.log('현재 스크롤',window.scrollY,'픽스',menuFixed,'메뉴',isMenuVisible);
      
    }else {
      setMenuFixed(false)
      setIsMenuVisible(false);
      console.log('현재 스크롤',window.scrollY,'픽스',menuFixed,'메뉴',isMenuVisible);
    }
  };

  window.addEventListener('scroll', handleScroll)

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [window.scrollY]);





  return (
    <div>
      {/* 메인 사진 */}
      <div className='main1banner' style={{
        backgroundImage: `url("${main3Img}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
        {/* 'main1_menu' */}
              <div className={isMenuVisible&&!menuFixed? 'menuVisible': isMenuVisible && menuFixed? 'noMenuVisible':"defaultMenu"}>
                <MainMenu/> 

              </div>
        <div className='main1_infoBackground'>
          <div className='M2banner_info'>
            <div className='main1Infocontainer'>
              {!loginClick? 
              <div>
                <h1>Baby's</h1>
                <h4>내 아이의 상태와 정보를 한눈에 <br />확인할 수 있어요 !</h4>
              </div>
              :
              <LoginFrom/>
              }
              
            </div>
            <div className='main1_bannerBtns'>
            <button id ='mainloginBtn' className="main1_loginBtn" onClick={()=>handleLoginBtnClick()}>
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">{loginClick?'돌아가기':'로그인'}</span>
            </button>
            
            <a href='/join'><button id ='mainjoinBtn' className="main1_loginBtn">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">회원가입</span>
              </button>
            </a>

            </div>
            <Link to="DetailInfo" spy={true} smooth={false}>
              <button className='mainImg_scrollBtn' variant="btntoggle">⇓</button>
            </Link>
          </div>
        </div>
      </div>
      <Box position="relative" id="DetailInfo">
        <div className='main1_infoContainer'>
          {/* 아이콘 이동 */}
          <div className='main1Icons'>

            <div className='diaryIcon'>
              <img src={bookIcon} style={{ width: '170px', height: '150px', marginTop: '15px', marginBottom: '10px' }} />
              <span>다이어리</span>
              <Link to="diaryDetail" spy={true} smooth={false}>
                <p variant="btntoggle">⇓</p>
                <button className='detailBtn' onClick={()=>handleMiniIconsClicked('book')}>자세히보기</button>
              </Link>
            </div>

            <div className='galleryIcon'>
              <img src={galleryIcon} style={{ width: '160px', height: '150px', marginTop: '25px' }} />
              <span>갤러리</span>
              <Link to="galleryDetail" spy={true} smooth={false}>
                <p variant="btntoggle">⇓</p>
                <button className='detailBtn' variant="btntoggle" onClick={()=>handleMiniIconsClicked('gallery')}>자세히보기</button>
              </Link>
            </div>

            <div className='tipIcon'>
              <img src={tipIcon} style={{ width: '170px', height: '175px' }} />
              <span>육아TIP</span>
              <Link to="tipDetail" spy={true} smooth={false}>
                <p variant="btntoggle">⇓</p>
                <button className='detailBtn' variant="btntoggle" onClick={()=>handleMiniIconsClicked('tip')}>자세히보기</button>
              </Link>
            </div>

          </div>
          {/* 아바타 설명란 */}
          <div className="main1_avatarContainer">
            <div className="blob-container">
              <div className="blob"></div>
              <div className="blob one"></div>
              <div className="blob two"></div>
              <div className="blob three"></div>
              <div className="blob four"></div>
              <div className="blob five"></div>
              <div className="blob six"></div>
              <div className="blob seven"></div>
              <div className="blob eight"></div>
              <div className="blob nine"></div>
              <div className="blob ten"></div>
            </div>

            <section className='main1_avatarSection'>
              <div className="main1_avatar_card">
                <div className="main1_avatarContent">
                  <img src={avatarImg} style={{ width: '100%' }} />
                </div>

                <div className="main1_avatar_title">
                  <h2>나의 아이 캐릭터를 등록 하면 <br /> 아이의 상태와 정보를 한눈에 <br /> 볼 수 있어요 !</h2>
                  <p><br />  - 나의 아이가 성장 할수록 아이 캐릭터도 <br /> 조금씩 성장해요</p>
                </div>
              </div>

            </section>
          </div>
        </div>
      </Box>
      {/* 다이어리 설명란 */}
      <Box position="relative" id="diaryDetail">
        <div className='main1Diary_box'>
          <div className='main1Icons_box'>
            
            {/* book 애니메이션 */}
            <div className='main1_bookPageBorder'>
            </div>
            <div className='main1_bookPage'>

              <div>
                <HTMLFlipBook width={430} height={500} mobileScrollSupport={false}>
                  <Page number="1"><img className='bookPage_img' width={'430px'} height={'500px'} src={testImg} /></Page>
                  <Page number="2"><img className='bookPage_img' width={'430px'} height={'500px'} src={testImg} /></Page>
                  <Page number="3"><img className='bookPage_img' width={'430px'} height={'500px'} src={testImg} /></Page>
                  <Page number="4"><img className='bookPage_img' width={'430px'} height={'500px'} src={testImg} /></Page>
                </HTMLFlipBook>

              </div>

              <div className="main1_book_title">
                <h2 className=''>나의 아이 캐릭터를 등록 하면 아이의 상태와 정보를  <br /> 한눈에 볼 수 있어요 !</h2>
                <br />
                <h5><br />  - 나의 아이가 성장 할수록 아이 캐릭터도 조금씩 성장해요</h5>
              </div>
              
            </div>
          </div>


        </div>
      </Box>
      {/* 갤러리 설명란 */}
      <Box position="relative" id="galleryDetail">
        <div className='main1Gallery_box'>
          

          <div className='main1_galleryPage'>
            <div className='main1_galleryContextFir'>
              <img src={testImg} width={'375px'} height={'450px'} />
              <h4>나의 아이 캐릭터를 등록 하면 아이의 상태와 정보를  한눈에 볼 수 있어요 !</h4>
              <h6><br />  - 나의 아이가 성장 할수록 아이 캐릭터도 조금씩 성장해요</h6>
            </div>
            <div className='main1_galleryContextSec'>
              <h4>나의 아이 캐릭터를 등록 하면 아이의 상태와 정보를 한눈에 볼 수 있어요 !</h4>
              <h6><br />  - 나의 아이가 성장 할수록 아이 캐릭터도 조금씩 성장해요</h6>
              <img src={testImg} width={'375px'} height={'450px'} />
            </div>
          </div>
          
        </div>
      </Box>
      {/* 팁 설명란 */}
      <Box position="relative" id="tipDetail">
        <div className='main1Tip_box'>
          
          <div className='main1_tipContainer'>
            <div className='main1_tipContainer_border'></div>
            <div className='main1_tipContext'>
              <h4>나의 아이 캐릭터를 등록 하면 아이의 상태 <br /> 정보를 한눈에 볼 수 있어요 !</h4>
              <h5><br />  - 나의 아이가 성장 할수록 아이 캐릭터도 조금씩 성장해요</h5>
              <h6><br />  - 나의 아이가 성장 할수록 아이 캐릭터도 조금씩 성장해요</h6>
           
            </div>
            <Slider {...settings} style={{ width: '500px', height: '600px', marginLeft: '7%', marginTop: '50px' }}>
              <div>

                <img className='main1_tipContextImg' src={testImg} />
              </div>
              <div>
                <img className='main1_tipContextImg' src={testImg} />
              </div>
              <div>
                <img className='main1_tipContextImg' src={testImg} />
              </div>

            </Slider>
          </div>


        </div>
      </Box>
    </div>
  )
}

export default Main1