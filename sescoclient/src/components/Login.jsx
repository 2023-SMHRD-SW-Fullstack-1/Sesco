import React from 'react'

const Login = () => {
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = 
    "http://localhost:3000/login/oauth2/callback/kakao"
    const loginHandler = () => {
        window.location.href = KAKAO_AUTH_URI; // url 주소 변경
      };
  return (
    <div>
        
    </div>
  )
}

export default Login