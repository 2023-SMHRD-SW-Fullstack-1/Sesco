import React from 'react'
import './Login.css'
import LoginImg from '../img/LoginImg.png';
import { MDBInput } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';


const join = () => {
    return (
        <div className='login_container'>

            <div className='loginForm_container'>

                <div className='img_container'>
                    {/* 회원가입 이미지 */}
                    <img src={LoginImg} style={{ borderRadius: '0px 10px 10px 0px', height: '650px' }} />
                </div>
                {/* 회원가입 입력 */}
                <div className='joinInput_container'>

                    <h2 className='joinTxt'>회원가입</h2>
                    {/* 이름 입력 */}
                    <span className='email_txt'>이름</span>
                    <input className='joinInput' placeholder='이름을 입력해주세요.' type='text' />
                    {/* 이메일 입력 */}
                    <span className='email_txt'>이메일</span>
                    <div className='email'>

                        <input className='emailInput' placeholder='이메일' type='email' />
                        <span>@</span>
                        <input className='emailInput' placeholder='주소' type='email' />
                    </div>
                    {/* 비밀번호 입력 */}
                    <span className='password_txt'>비밀번호</span>
                    <input className='joinInput' placeholder='비밀번호를 입력해주세요.' type='password' />
                    {/* 비밀번호 입력 */}
                    <span className='password_txt'>비밀번호 확인</span>
                    <input className='joinInput' placeholder='비밀번호를 입력해주세요.' type='password' />
                    {/* 로그인 버튼 */}
                    <button className='joginBtn'>회원가입</button>
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

export default join