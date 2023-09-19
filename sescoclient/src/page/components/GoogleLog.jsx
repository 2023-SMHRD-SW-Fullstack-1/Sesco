import React, { useState } from 'react'
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from 'axios';
import { useEffect } from 'react';

const GoogleLog = () => {
  const clientId = '620860754662-apr8p8bcdhhs98e8ug6iugr30rsv4l3d.apps.googleusercontent.com'
  const login_type = "G";
  const [member, setMember] = useState(null);

  const config = {
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  };

 
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          useOneTap={false}
          onSuccess={(res) => {
            //console.log("성공")
            //console.log(res);
            const googleLogResult = async () => {
              try {
                const response = await axios.post('http://localhost:8081/sesco/member/googlelogin', {
                   res: res.credential,
                   login_type : login_type
                   }, config);
                   if (response.status === 200) {
                    console.log('결과가 성공적으로 저장되었습니다.');
                    console.log('요청데이터 결과', res);
                    setMember(response.data.Member);
                    console.log("응답",member);
                    if(member==null){
                      // 회원가입 폼 해.줘!
                    }
                }
              } catch (error) {
                console.error('결과 저장 중 오류 발생:', error);
              }
            };
          
            googleLogResult();
          }}
          onFailure={(err) => {
            console.log("실패")
            console.log(err);
          }}
        />
      </GoogleOAuthProvider>
    </>
  )
}

export default GoogleLog