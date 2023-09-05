import React from 'react'

const Login = () => {
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = 
    "http://localhost:3000/login/oauth2/callback/kakao"
    
  return (
    <div>Login</div>
  )
}

export default Login