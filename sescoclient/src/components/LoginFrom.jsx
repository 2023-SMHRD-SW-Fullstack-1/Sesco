import React, { useState } from 'react'
import './Login.css'
import LoginImg from '../img/LoginImg.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleLog from '../page/components/GoogleLog';




const LoginFrom = () => {
const nav = useNavigate();


// 로그인시 유저 아이디 체크
const [user_id, setUserId] = useState('');
// 로그인시 유저 비밀번호 체크
const [user_pw, setUserPw] = useState('');
// 로그인시 유저 닉네임 체크
const [user_nick, setUserNick] = useState('');
// 로그인 화면 보여줄지 찾기 화면 보여줄지 확인
const [findBtnClick, setFindBtnClick] = useState(false);
// 찾기 화면 보여줄때 아이디 찾기 보여줄지 비밀번호 찾기 보여줄지 확인
const [userInfoIdPw, setUserInfoIdPw] = useState(false);
// 찾기시 이메일 저장
const [userEmail, setUserEmail] = useState('');
// 찾기시 이름 저장
const [userName, setUserName] = useState('');
// 찾기시 아이디 저장
const [userIdCheck, setUserIdCheck] = useState('');
// 찾기시 입력값에 일치한 결과 있는지 확인
const [userInfo, setUserInfo] = useState(false);






    // 로그인 버튼
    const saveUserInfo = () => {
        fetchData();
        console.log('user_id:', user_id, 'pw:', user_pw);
    }
    const config = {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    }

    // 아이디,비밀번호 찾기 버튼
    const findUserInfo = (data) => {
        if (data === 'id') {
            setUserInfoIdPw(true);
        } else {
            setUserInfoIdPw(false);
        }
        { findBtnClick ? setFindBtnClick(false) : setFindBtnClick(true) }
    }

    // 아이디 찾기 확인 버튼 
    const findUserIdResult = () => {
        console.log("확인 버튼 이메일 : ", userEmail, "이름 : ", userName);
        findIdData()
    }
    const findUserPwResult=()=>{
        findPwData()
    }

    const findPwData=()=>{
        const requestData = {
            user_id : userIdCheck,
            user_email: userEmail,
            user_name : userName
        };
        axios.post(`http://localhost:8081/sesco/member/searchpw`, requestData, config)
            .then((res) => {

                try {
                    // id와 pw가 로그인정보와 일치하다면
                        
                        // 세션에 id, nick, sns 정보 저장
                        // sessionStorage.getItem(user_pw);
                        // console.log(user_id);
                        // 로그인 여부 : true 
                       
                        console.log( 'res',res.data);
                        console.log(sessionStorage.user_id);
                        if(res.data){
                            alert(`회원님의 비밀번호는 ' ${res.data} '  입니다`)
                        }else{
                            alert('일치하는 비밀번호가 없습니다')

                        }
                } catch {
                    alert('조회 실패')
                    console.log('res',res.data);
                }
            })
    }
    const findIdData=()=>{
        const requestData = {
            user_email: userEmail,
            user_name : userName
        };
        axios.post(`http://localhost:8081/sesco/member/searchid`, requestData, config)
            .then((res) => {

                try {
                    // id와 pw가 로그인정보와 일치하다면   
                        // 세션에 id, nick, sns 정보 저장
                        sessionStorage.getItem(user_id);
                        console.log(user_id);
                        // 로그인 여부 : true 
                        if(res.data){
                            alert(`회원님의 아이디는 ' ${res.data} ' 입니다`)
                        }else{
                            alert('일치하는 아이디가 없습니다')

                        }
                        console.log( 'res',res.data);
                        console.log(sessionStorage.user_id);
                 
                } catch {
                    alert('조회 실패')
                    console.log('res',res.data);
                }
            })
    }
    
    const fetchData = () => {
        const requestData = {
            user_id: user_id,
            user_pw: user_pw,
        };
        axios.post(`http://localhost:8081/sesco/member/login`, requestData, config)
            .then((res) => {

                try {
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
                    }
                } catch {
                    alert('로그인정보가 일치하지 않음')
                }
            })
    }

    return (
        <>
            {findBtnClick ?
                // 아이디 찾기 /비밀번호 찾기 

                <div className='loginfrom'>
                    <h2>{userInfoIdPw ? '아이디 찾기' : '비밀번호 찾기'}</h2>
                    {/* 이메일 입력 */}
                    <div className='idInput'>
                        <input className='loginInputId' placeholder='이메일을 입력해주세요' type='text' onChange={(e) => setUserEmail(e.target.value)} value={userEmail} />
                    </div>
                    {/* 이름/ 아이디 입력 */}
                    <div className='pwInput'>
                        <input className='passInput' placeholder={userInfoIdPw ? '이름을 입력해주세요' : '아이디를 입력해주세요'} type='text'
                            onChange={(e) => { userInfoIdPw ? setUserName(e.target.value) : setUserIdCheck(e.target.value) }}
                            value={userInfoIdPw ? userName : userIdCheck} />
                    </div>
                    {!userInfoIdPw?
                    <div className='idInput'>
                        <input className='loginInputId' placeholder='이름 입력해주세요' type='text' onChange={(e) => setUserName(e.target.value)} value={userName} />
                    </div>
                    :
                    ""
                    }

                    {/* 찾기 버튼 */}
                    <button className='loginFindBtn' onClick={() =>{userInfoIdPw?findUserIdResult() : findUserPwResult()} }>확인</button>

                    {/* 결과 -> 아이디 or 비밀번호 표시란 */}
                    {userInfo ?
                        <div className='findResult'>{userInfoIdPw ? '아이디' : '비밀번호'} : </div>
                        : ""
                    }

                </div>

                :

                // 일반 로그인 화면 
                <div className='loginfrom'>
                    <h2>로그인</h2>
                    {/* 이메일 입력 */}
                    <div className='idInput'>
                        <input className='loginInputId' placeholder='아이디를 입력해주세요' type='text' onChange={(e) => setUserId(e.target.value)} value={user_id} />
                    </div>
                    {/* 비밀번호 입력 */}
                    <div className='pwInput'>
                        <input className='passInput' placeholder='비밀번호를 입력해주세요.' type='password' onChange={(e) => setUserPw(e.target.value)} value={user_pw} />
                    </div>
                    {/* 비밀번호 찾기 */}
                    <div className='login_password_txt'>
                        <button className='idFindBtn' onClick={() => findUserInfo('id')}>아이디 찾기</button>
                        <button className='pwFindBtn' onClick={() => findUserInfo('pw')}>비밀번호 찾기</button>
                    </div>
                    {/* 로그인 버튼 */}
                    <button className='loginBtn' onClick={() => saveUserInfo()}>로그인</button>
                    {/* 소셜 로그인 버튼  */}
                    <div className='login_socialBtns'>
                        <GoogleLog/>
                    </div>
                </div>
            }

        </>
    )
}

export default LoginFrom