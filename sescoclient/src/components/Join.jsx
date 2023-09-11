import React from 'react'
import './Login.css'
import LoginImg from '../img/LoginImg.png'

const join = () => {
  return (
    <div>
         <div className='login_container'>
      <div className='loginForm_container'>
        {/* 로그인 입력 */}
        <div className='joinInput_container'>

          <h2>회원가입</h2>
          <span className='join_txt'>이름</span>
          <input placeholder='이름을 입력해주세요.' />
          <span className='join_txt'>이메일</span>
          <input placeholder='이메일을 입력해주세요.' />
          <span className='join_txt'>비밀번호</span>
          <input placeholder='비밀번호를 입력해주세요.' />
          <span className='join_txt'>비밀번호 확인</span>
          <input placeholder='비밀번호를 입력해주세요.' />
          {/* 로그인 버튼 */}
          <button className='joginBtn'>회원가입</button>
          <p> 계정이 있으신가요? <a href='/join'>로그인하러가기</a></p>
          {/* 소셜 로그인 버튼  */}
          <div className='socialBtns'>
            <button className='kakaoBtn'>카카오</button>
            <button className='googleBtn'>구글</button>
          </div>

        </div>
        <div className='img_container'>
          {/* 로그인 이미지 */}
          <img src={LoginImg} style={{ borderRadius: '0px 10px 10px 0px', height: '650px' }} />
        </div>

      </div>
    </div>

        
    </div>
  )
}

export default join