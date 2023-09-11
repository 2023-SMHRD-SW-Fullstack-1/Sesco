
import React from 'react'
import './Login.css'
import LoginImg from '../img/LoginImg.png'


const Login = () => {


  return (


    <div className='login_container'>
      <div className='loginForm_container'>
        {/* 로그인 입력 */}
        <div className='loginInput_container'>

          <h2>로그인</h2>
          <span className='email_txt'>이메일</span>
          <input placeholder='이메일을 입력해주세요.' />
          {/* 비밀번호 찾기 */}
          <div className='password_txt'>
            <span>비밀번호</span>
            <a href='#'>비밀번호를 잊어버리셨나요?</a>
          </div>
          <input placeholder='비밀번호를 입력해주세요.' />
          {/* 로그인 버튼 */}
          <button className='loginBtn'>로그인</button>
          <p> 계정이 없으신가요? <a href='/join'>회원가입</a></p>
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
  )
}


export default Login;
