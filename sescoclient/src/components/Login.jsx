
import React, { useState } from 'react'
import './Login.css'
import LoginImg from '../img/LoginImg.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [user_id, setUserId] = useState('');
  const [user_pw, setUserPw] = useState('');
  const [user_nick , setUserNick] = useState('');
  

  const nav = useNavigate();


  const saveUserInfo = () => {
    fetchData();
    console.log('user_id:', user_id , 'pw:', user_pw);
  }
  const config = {
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
}

  const fetchData = () => {
    const requestData = {
        user_id: user_id,
        user_pw: user_pw,
    };
    axios.post(`http://localhost:8081/sesco/member/login`, requestData, config)
        .then((res) => {

            try{
            // id와 pw가 로그인정보와 일치하다면
            if (res.data.loginUser.user_id == user_id && res.data.loginUser.user_pw == user_pw) {
                setUserNick(res.data.loginUser.user_nick)
                // 세션에 id, nick, sns 정보 저장
                sessionStorage.setItem('user_id', user_id)
                sessionStorage.setItem('user_nick', res.data.loginUser.user_nick)

                // 로그인 여부 : true 
                alert('로그인성공')
                nav('/main')
                console.log(res.data);
                console.log(sessionStorage.user_nick);
              } else {
                alert('로그인정보가 일치하지 않습니다.')
                console.log(res.data);
              }}catch{
                alert('로그인정보가 일치하지 않음')
            }
        })
}

  return (
    
    <div className='login_container'>
      <div className='loginForm_container'>
        {/* 로그인 입력 */}
        <div className='loginInput_container'>

          <h2>로그인</h2>
          {/* 이메일 입력 */}
          <span className='email_txt'>아이디</span>
         
            <input className='loginInputId' placeholder='이메일' type='text' onChange={(e)=>setUserId(e.target.value)} value={user_id}/>
            
        
          {/* 비밀번호 찾기 */}
          <div className='password_txt'>
            <span>비밀번호</span>
            <a href='#'>비밀번호를 잊어버리셨나요?</a>
          </div>
          {/* 비밀번호 입력 */}
          <input className='passInput' placeholder='비밀번호를 입력해주세요.' type='password'onChange={(e)=>setUserPw(e.target.value)} value={user_pw} />
          {/* 로그인 버튼 */}
          <button className='loginBtn' onClick={()=>saveUserInfo()}>로그인</button>
          <p className='login_jointxt'> 계정이 없으신가요? <a href='/join'>회원가입</a></p>
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
