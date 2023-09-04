import React from 'react'

const Login = () => {

  //api key값
    const clientId = 'fa08f9dd3f1a65f4f4c681ca677d334c'
    const redirectUri = 'http://localhost:3000/sesco/login/oauth2/callback/kakao'
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    const loginHandler = () => {
      window.location.href = KAKAO_AUTH_URI; // url 주소 변경
    };
  return (
    <div>
        <button onClick={loginHandler}>
          로그인
        </button>
    </div>
  )
}

export default Login