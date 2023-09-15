import React from 'react'
import main1Img from '../img/main1/main1Img.png'
import bookIcon from '../img/main1/main1_bookIcon.png'
import tipIcon from '../img/main1/main1_TipIcon.png'
import galleryIcon from '../img/main1/main1_galleryIcon.png'
import avatarImg from '../img/main1/main1_avatarImg.png'
import { Link } from 'react-scroll';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'


const Main1 = () => {
  const nav = useNavigate();
  return (
    <div>

      <div className='main1banner' style={{
        backgroundImage: `url("${main1Img}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
        <div className='M2banner_info'>
          <h1>baby's</h1>

          <h4>내 아이의 상태와 정보를 한눈에 <br />확인할 수 있어요 !</h4>
          <div>
            <button className='mainImg_loginBtn' onClick={()=> nav('/login')}>로그인</button>
            <button className='mainImg_joinBtn' onClick={()=> nav('/join')}>회원가입</button>
          </div>
          <Link to="DetailInfo" spy={true} smooth={false}>
            <button className='mainImg_scrollBtn' variant="btntoggle">⇓</button>
          </Link>
        </div>
      </div>
      <Box position="relative" id="DetailInfo">
        <div className='main1_infoContainer'>

          <div className='main1Icons'>

            <div className='diaryIcon'>
              <img src={bookIcon} style={{ width: '170px', height: '150px', marginTop: '15px', marginBottom: '10px' }} />
              <span>다이어리</span>
              <Link to="diaryDetail" spy={true} smooth={true}>
                <p variant="btntoggle">⇓</p>
                <button className='detailBtn' variant="btntoggle">자세히보기</button>
              </Link>
            </div>

            <div className='galleryIcon'>
              <img src={galleryIcon} style={{ width: '160px', height: '150px', marginTop: '25px' }} />
              <span>갤러리</span>
              <Link to="galleryDetail" spy={true} smooth={true}>
                <p variant="btntoggle">⇓</p>
                <button className='detailBtn' variant="btntoggle">자세히보기</button>
              </Link>
            </div>

            <div className='tipIcon'>
              <img src={tipIcon} style={{ width: '170px', height: '175px' }} />
              <span>육아TIP</span>
              <Link to="tipDetail" spy={true} smooth={true}>
                <p variant="btntoggle">⇓</p>
                <button className='detailBtn' variant="btntoggle">자세히보기</button>
              </Link>
            </div>

          </div>
          <div className='main1_avatarContainer'>
            <div className='main1_avatarContent'>
              <img src={avatarImg} style={{ width: '860px', height: '520px' }} />
            </div>
            <div className='main1_avatarContext'>
              <h2>나의 아이 캐릭터를 등록 하면 <br /> 아이의 상태와 정보를 한눈에 <br /> 볼 수 있어요 !</h2>
              <h4>- 나의 아이가 성장 할수록 아이 캐릭터도 <br/> 조금씩 성장해요</h4>

            </div>
          </div>

        </div>
      </Box>
      <Box position="relative" id="diaryDetail">
        <div className='testt'>
          <p>다이어리</p>
        </div>
      </Box>
      <Box position="relative" id="galleryDetail">
        <div className='testt'>
          <p>갤러리</p>
        </div>
      </Box>
      <Box position="relative" id="tipDetail">
        <div className='testt'>
          <p>육아Tip</p>
        </div>
      </Box>


    </div>
  )
}

export default Main1