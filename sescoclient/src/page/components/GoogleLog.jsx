import React, { useRef, useState } from 'react'
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from 'axios';
import { useEffect } from 'react';
import styled from 'styled-components'
import { keyframes } from 'styled-components';
import { Button, Alert} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../components/Login.css'

const GoogleLog = () => {
  const clientId = '620860754662-apr8p8bcdhhs98e8ug6iugr30rsv4l3d.apps.googleusercontent.com'
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
    if(inputValue==null){
      setIsError(!isError)
    }else{
    axios.post('http://localhost:8081/sesco/member/googlejoin', {
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
  }

 
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40px" }}>
      <div>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          useOneTap={false}
          onSuccess={(res) => {
            //console.log("성공")
            //console.log(res);
            const googleLogResult = async () => {
              try {
                const response = await axios.post('http://localhost:8081/sesco/member/googlelogin', {
                   res: res.credential
                }, config);

                if (response.status === 200) {
                setMemberToken(res.credential);
                  if(response.data.Member==null){
                    setIsJoin(!isJoin)
                  }else{
                    sessionStorage.setItem("user_nick",response.data.Member.user_nick)
                    sessionStorage.setItem("user_id",response.data.Member.user_id)
                    navigate('/main');
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
  top:100px;
  width:500px; 
  height:400px; 
  animation:${createJoin} 0.7s;
  z-index: 15;
`
const GoogleJoinBox = styled.div`
  background-color:white;
  z-index: 100;
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

export default GoogleLog