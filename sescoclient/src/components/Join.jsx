import React, { useState } from 'react'
import './Login.css'
import LoginImg from '../img/LoginImg.png';
import { MDBInput } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Join = () => {
    const nav= useNavigate();

    const [user_name, setNameValue] = useState('');
    const [user_id, setIdValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [emailAdsValue, setEmailAdsValue] = useState('');
    const [user_pw, setPwValue] = useState('');
    const [pwCheckValue, setPwCheckValue] = useState('');
    const [user_nick, setNickValue] = useState('');
    const user_email = emailValue + '@' + emailAdsValue;
    const [loginResult,setLoginResult] = useState('');

    // const userInfo = {
    //     'user_name':user_name,
    //     'user_id':user_id,
    //     'user_email':user_email,
    //     'user_pw':user_pw,
    //     'user_nick':user_nick 
    // }





    const fetchData = async () => {

        try {


            await axios.post("http://localhost:8081/sesco/member/join", {
                user_id : user_id,
                user_pw :user_pw,
                user_email:user_email,
                user_nick : user_nick,
                user_name : user_name
            }).then((res)=>setLoginResult(res.data));

        } catch (error) {
            console.error('데이터를 불러오는 중 오류 발생:', error)
        }
    };


    const saveUserInfo = () => {
        if(loginResult==='id중복'){
            alert('ID중복입니다. ID를 확인하세요')
        }else if(loginResult==='nick중복'){
            alert('닉네임 중복입니다. 닉네임을 확인하세요')
        }else if(loginResult==='email중복'){
            alert('이메일 중복입니다. 이메일을 확인하세요')
        }else if(loginResult==='success'){
            alert('🎺회원가입 성공🎺')
            nav('/login')
        }
        fetchData();
        console.log('name:', user_name, 'nick:', user_nick, 'id:', user_id, 'email:', user_email, 'pw:', user_pw, 'pwCheck:', pwCheckValue);
    }




    return (
        <div className='join_container'>

            <div className='joinForm_container'>

                <div className='join_img_container'>
                    {/* 회원가입 이미지 */}
                    <img src={LoginImg} style={{ borderRadius: '0px 10px 10px 0px', height: '770px' }} />
                </div>
                {/* 회원가입 입력 */}
                <div className='joinInput_container'>
                    <h2 className='joinTxt'>회원가입</h2>

                    <div className='name_nick_txt'>
                        <span>이름</span>
                        <span>닉네임</span>
                    </div>
                    <div className='loginNameNick'>

                        {/*이름, 닉네임 입력 */}
                        <input className='nameNickInput' placeholder='이름' type='text' onChange={(e) => setNameValue(e.target.value)} value={user_name} />
                        <input className='nameNickInput' placeholder='닉네임' type='email' onChange={(e) => setNickValue(e.target.value)} value={user_nick} />
                    </div>
                    {/* 아이디 입력 */}
                    <span className='email_txt'>아이디</span>
                    <input className='joinInput' placeholder='아이디를 입력해주세요.' type='text' onChange={(e) => setIdValue(e.target.value)} value={user_id} />
                    <span className='email_txt'>이메일</span>
                    {/* 이메일 입력 */}
                    <div className='email'>

                        <input className='emailInput' placeholder='이메일' type='email' onChange={(e) => setEmailValue(e.target.value)} value={emailValue} />
                        <span>@</span>
                        <input className='emailInput' placeholder='주소' type='email' onChange={(e) => setEmailAdsValue(e.target.value)} value={emailAdsValue} />
                    </div>


                    {/* 비밀번호 입력 */}
                    <span className='password_txt'>비밀번호</span>
                    <input className='joinInput' placeholder='비밀번호를 입력해주세요.' type='password' onChange={(e) => setPwValue(e.target.value)} value={user_pw} />
                    {/* 비밀번호 입력 */}
                    <span className='password_txt'>비밀번호 확인</span>
                    <input className='joinInput' placeholder='비밀번호를 입력해주세요.' type='password' onChange={(e) => setPwCheckValue(e.target.value)} value={pwCheckValue} />
                    {user_pw===pwCheckValue?
                    <span className='password_txt'>비밀번호 일치 </span>
                    :
                    <span className='password_txt'>다시 입력해주세요 </span>
                    }
                    {/* 로그인 버튼 */}
                    <button className='joginBtn' onClick={() => saveUserInfo()} >회원가입</button>
                    <p className='login_jointxt'> 계정이 있으신가요? <a href='/login'>로그인하러가기</a></p>
                    {/* 소셜 로그인 버튼  */}
                    <div className='socialBtns'>
                        <button className='kakaoBtn'>카카오</button>
                        <button className='googleBtn'>구글</button>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Join