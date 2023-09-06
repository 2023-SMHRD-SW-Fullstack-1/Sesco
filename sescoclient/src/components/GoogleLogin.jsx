import React from 'react';
import  { useState, useEffect } from 'react';

function GoogleLogin() {
    const [authCode, setAuthCode] = useState(null);
    const handleLogin = () => {
        const clientId = "339476817297-767npjjvgs7de9rejg4fao170u7sn78h.apps.googleusercontent.com"
        const redirectUri = "http://localhost:8081/sesco/login/oauth2/code/google"
        const scope = "email%20profile";

        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
        console.log(url)

        // Redirect 
        window.location.href = url;
        
    };
     useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        console.log(code)
  
        if (code) {
            setAuthCode(code);
            console.log(code);
        }
      }, []);
    return (
        <button onClick={handleLogin}>
            구글로그인
        </button>
    );
}

export default GoogleLogin;
