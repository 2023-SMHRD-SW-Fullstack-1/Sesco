import React, { useRef, useState } from 'react'
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components'
import { keyframes } from 'styled-components';
import { Button, Alert} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const KakaoLogin = () => {
  const [memberToken, setMemberToken] = useState(0);
  const [isJoin, setIsJoin] = useState(false);
  const [isError,setIsError] = useState(false);
  const inputRef = useRef(null);

  const config = {
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
  };

  const navigate = useNavigate();

  const submitNick=()=>{
    const inputValue = inputRef.current.value;
    setIsError(false)
    axios.post('http://localhost:8081/sesco/member/kakao', {
      res : memberToken,
      user_nick : inputValue
    }).then((res)=>{
      if(res.data.Member){
        sessionStorage.setItem("user_nick",res.data.Member.user_nick)
        sessionStorage.setItem("user_id",res.data.Member.user_id)
        navigate('/main');
      }else{
        setIsError(!isError)
      }
    })
  }
  window.Kakao.init("27256ac4e21a4b8106bcf1137ed16b87")
  const Kakao = () => {
    window.Kakao.Auth.login({
      scope: 'profile_nickname, profile_image, account_email',
      success: async function (authObj) {
        console.log(authObj);
        setMemberToken(authObj.access_token)
        const response = await window.Kakao.API.request({
          url: '/v2/user/me',
        });
        const kakaoAccount = response.kakao_account;
        console.log(kakaoAccount);
  
        // Kakao 사용자 정보를 Spring 서버로 전송
        try {
          await axios.post("http://localhost:8081/sesco/login/kakao", {
            id: authObj.id, // Kakao 사용자 고유 ID
            nickname: kakaoAccount.profile.nickname, // 닉네임
            email: kakaoAccount.email, // 이메일
          })
          .then((res)=>{
            console.log("Kakao 정보 서버로 전송 완료",res.data);
            if(res.data==null){
              //미가입된 회원이니까 회원가입으로 넘겨서 닉네임 입력받고 스프링으로 회원가입 넘기면 댐!
              
            }
          })
        } catch (error) {
          console.error("Kakao 정보 서버로 전송 실패:", error);
        }
      },
    });
  };
 
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <div>
        
      </div>
      {isJoin && <GoogleJoinContainer>
          <GoogleJoinBox>
            <h2> 회원가입 </h2>
            <Input  ref={inputRef} placeholder= "닉네임을 입력해주세요"></Input>
            {isError && <Alert style={{fontSize:"13px", marginTop:"10px"}} key="danger" variant="danger">닉네임 중복 : 다른 닉네임을 입력해주세요 </Alert>}
            <Button onClick={()=>submitNick()} variant="primary">완료</Button>{' '}
          </GoogleJoinBox> 
        </GoogleJoinContainer>}
    </div>
  )
}

const createJoin = keyframes`
  from {
    padding: 100px;
  }
  to {
    padding: 50px;
  }
`

const GoogleJoinContainer = styled.div`
  padding:50px;
  position:absolute;
  width:500px; 
  height:400px; 
  animation:${createJoin} 0.7s
`
const GoogleJoinBox = styled.div`
  background-color:white;
  width:100%; 
  height:100%;
  // border : 3px solid #ff7f00;
  border-radius : 10px;
  display : flex;
  justify-content : space-between;
  align-items : center;
  flex-direction : column;
  padding : 50px;
  overflow: hidden;
  border: 2px solid rgba(194, 194, 194, 0.8);
  box-shadow: 0 5px 20px rgba(194, 194, 194, 0.7);
`

const Input = styled.input`
  border-radius : 10px;
  padding : 3px;
  height : 25%;
  width : 100%;
  text-align : center;
  border: 2px solid rgba(194, 194, 194, 0.8);
`

export default KakaoLogin