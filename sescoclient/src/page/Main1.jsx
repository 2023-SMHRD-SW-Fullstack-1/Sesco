import React from 'react'
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

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <p>{props.children}</p>
      <p className='main1_page_number'>{props.number}</p>
    </div>
  );
});

const Main1 = () => {

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
  return (
    <div>
      {/* 메인 사진 */}
      <div className='main1banner' style={{
        backgroundImage: `url("${main3Img}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
        <div className='M2banner_info'>
          <h1>baby's</h1>

          <h4>내 아이의 상태와 정보를 한눈에 <br />확인할 수 있어요 !</h4>
          <div>
            <button className='mainImg_loginBtn' onClick={() => nav('/login')}>로그인</button>
            <button className='mainImg_joinBtn' onClick={() => nav('/join')}>회원가입</button>
          </div>
          <Link to="DetailInfo" spy={true} smooth={false}>
            <button className='mainImg_scrollBtn' variant="btntoggle">⇓</button>
          </Link>
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
                <button className='detailBtn' >자세히보기</button>
              </Link>
            </div>

            <div className='galleryIcon'>
              <img src={galleryIcon} style={{ width: '160px', height: '150px', marginTop: '25px' }} />
              <span>갤러리</span>
              <Link to="galleryDetail" spy={true} smooth={false}>
                <p variant="btntoggle">⇓</p>
                <button className='detailBtn' variant="btntoggle">자세히보기</button>
              </Link>
            </div>

            <div className='tipIcon'>
              <img src={tipIcon} style={{ width: '170px', height: '175px' }} />
              <span>육아TIP</span>
              <Link to="tipDetail" spy={true} smooth={false}>
                <p variant="btntoggle">⇓</p>
                <button className='detailBtn' variant="btntoggle">자세히보기</button>
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
            <Link to="diaryDetail" spy={true} smooth={false}>
              <div className='diaryIcon_box'>
                <img src={bookIcon} style={{ width: '90px' }} />
              </div>
            </Link>
            <Link to="galleryDetail" spy={true} smooth={false}>
              <div className='diaryIcon_box'>
                <img src={galleryIcon} style={{ width: '90px' }} />
              </div>
            </Link>
            <Link to="tipDetail" spy={true} smooth={false}>
              <div className='diaryIcon_box'>
                <img src={tipIcon} style={{ width: '90px' }} />
              </div>
            </Link>


            <div className='main1_bookPageBorder'>
            </div>
            <div className='main1_bookPage'>

              <div>
                <HTMLFlipBook width={460} height={500} mobileScrollSupport={false}>
                  <Page number="1"><img className='bookPage_img' width={'460px'} height={'500px'} src={testImg} /></Page>
                  <Page number="2"><img className='bookPage_img' width={'460px'} height={'500px'} src={testImg} /></Page>
                  <Page number="3"><img className='bookPage_img' width={'460px'} height={'500px'} src={testImg} /></Page>
                  <Page number="4"><img className='bookPage_img' width={'460px'} height={'500px'} src={testImg} /></Page>
                </HTMLFlipBook>

              </div>

              <div className="main1_book_title">
                <h2 className=''>나의 아이 캐릭터를 등록 하면 아이의 상태와 정보를  <br /> 한눈에 볼 수 있어요 !</h2>
                <br />
                <h5><br />  - 나의 아이가 성장 할수록 아이 캐릭터도 조금씩 성장해요</h5>
              </div>
              <div className='main1_diaryBoxlogin'>
                <h6><br /> 로그인 하러가기 ⇒</h6>
                <button className='mainBox_loginBtn' onClick={() => nav('/login')}>로그인</button>
              </div>
            </div>

          </div>

        </div>
      </Box>
      {/* 갤러리 설명란 */}
      <Box position="relative" id="galleryDetail">
        <div className='main1Gallery_box'>
          <div className='main1Icons_box'>
            <Link to="diaryDetail" spy={true} smooth={false}>
              <div className='diaryIcon_box'>
                <img src={bookIcon} style={{ width: '90px' }} />
              </div>
            </Link>
            <Link to="galleryDetail" spy={true} smooth={false}>
              <div className='diaryIcon_box'>
                <img src={galleryIcon} style={{ width: '90px' }} />
              </div>
            </Link>
            <Link to="tipDetail" spy={true} smooth={false}>
              <div className='diaryIcon_box'>
                <img src={tipIcon} style={{ width: '90px' }} />
              </div>
            </Link>
          </div>

          <div className='main1_galleryPage'>
            <div className='main1_galleryContextFir'>
              <img src={testImg} width={'415px'} height={'500px'} />
              <h4>나의 아이 캐릭터를 등록 하면 아이의 상태와 정보를  한눈에 볼 수 있어요 !</h4>
              <h6><br />  - 나의 아이가 성장 할수록 아이 캐릭터도 조금씩 성장해요</h6>
            </div>
            <div className='main1_galleryContextSec'>
              <h4>나의 아이 캐릭터를 등록 하면 아이의 상태와 정보를 한눈에 볼 수 있어요 !</h4>
              <h6><br />  - 나의 아이가 성장 할수록 아이 캐릭터도 조금씩 성장해요</h6>
              <img src={testImg} width={'415px'} height={'500px'} />
            </div>
          </div>
          <div className='main1_boxlogin'>
            <h6><br /> 로그인 하러가기 ⇒</h6>
            <button className='mainBox_loginBtn' onClick={() => nav('/login')}>로그인</button>
          </div>
        </div>
      </Box>
      {/* 팁 설명란 */}
      <Box position="relative" id="tipDetail">
        <div className='main1Tip_box'>
          <div className='main1Icons_box'>
            <Link to="diaryDetail" spy={true} smooth={false}>
              <div className='diaryIcon_box'>
                <img src={bookIcon} style={{ width: '90px' }} />
              </div>
            </Link>
            <Link to="galleryDetail" spy={true} smooth={false}>
              <div className='diaryIcon_box'>
                <img src={galleryIcon} style={{ width: '90px' }} />
              </div>
            </Link>
            <Link to="tipDetail" spy={true} smooth={false}>
              <div className='diaryIcon_box'>
                <img src={tipIcon} style={{ width: '90px' }} />
              </div>
            </Link>
          </div>
          <div className='main1_tipContainer'>
            <div className='main1_tipContainer_border'></div>
            <div className='main1_tipContext'>
              <h4>나의 아이 캐릭터를 등록 하면 아이의 상태와 <br /> 정보를 한눈에 볼 수 있어요 !</h4>
              <h5><br />  - 나의 아이가 성장 할수록 아이 캐릭터도 조금씩 성장해요</h5>
              <h6><br />  - 나의 아이가 성장 할수록 아이 캐릭터도 조금씩 성장해요</h6>
              <div className='main1_boxlogin'>
                <h6><br /> 로그인 하러가기 ⇒</h6>
                <button className='mainBox_loginBtn' onClick={() => nav('/login')}>로그인</button>
              </div>
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