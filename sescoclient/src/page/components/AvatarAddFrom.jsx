import React, { useState } from 'react'
import avatarBg from '../../img/avatarBg.png'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const AvatarAddFrom = () => {


    const user_id = sessionStorage.getItem('user_id');
    const [kid_Name, setKid_Name] = useState('');
    const [kid_gender, setKid_Gender] = useState('');
    const [kid_birth, setKid_Age] = useState('');
    const [kid_Weight, setKid_Weight] = useState('');
    const [kid_height, setKid_Key] = useState('');
    console.log('kid_name', kid_Name, 'kid_birth', kid_birth, 'kid_weight', kid_Weight, 'kid_height', kid_height, 'kid_gender', kid_gender,'user_id',user_id);


    const saveKidInfo = () => {
    //     fetchData();
    //     console.log('user_id:', user_id, 'pw:', user_pw);
    }
    // const config = {
    //     headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    // }

    // const fetchData = () => {
    //     const requestData = {
    //         user_id: user_id,
    //         user_pw: user_pw,
    //     };
    //     axios.post(`http://localhost:8081/sesco/member/login`, requestData, config)
    //         .then((res) => {

    //             try {
    //                 // id와 pw가 로그인정보와 일치하다면
    //                 if (res.data.loginUser.user_id == user_id && res.data.loginUser.user_pw == user_pw) {
    //                     setUserNick(res.data.loginUser.user_nick)
    //                     // 세션에 id, nick, sns 정보 저장
    //                     sessionStorage.setItem('user_id', user_id)
    //                     sessionStorage.setItem('user_nick', res.data.loginUser.user_nick)

    //                     // 로그인 여부 : true 
    //                     alert('아이 등록 완료')
    //                     console.log(res.data);
    //                     console.log(sessionStorage.user_nick);
    //                 } else {
    //                     alert('로그인정보가 일치하지 않습니다.')
    //                     console.log(res.data);
    //                 }
    //             } catch {
    //                 alert('로그인정보가 일치하지 않음')
    //             }
    //         })
    // }


    return (

        <div className='avatar'>
            <div className='avatar-container'>
                <img style={{ width: '550px', height: '450px', marginLeft: '10px', marginRight: '10px', borderRadius: '8px' }} src={avatarBg} />
                <div className='avatar-contents'>
                    <div className='saveBabyInfoContent'>
                        {/* 이름, 성별 */}
                        <div className='saveBabyInfo'>
                            <p className='saveBabyName'>이름</p>
                            <input id='babyInfoInput1' placeholder="아이 이름" onChange={(e) => setKid_Name(e.target.value)} />
                            <p className='saveBabyGender'>성별</p>
                            <div>
                                <Form.Check
                                    inline
                                    label="남"
                                    name="group1"
                                    type="radio"
                                    id={`inline-"radio"-1`}
                                    value='man'
                                    onChange={(e) => setKid_Gender(e.target.value)}
                                />
                                <Form.Check
                                    inline
                                    label="여"
                                    name="group1"
                                    type="radio"
                                    id={`inline-"radio"-2`}
                                    value='woman'
                                    onChange={(e) => setKid_Gender(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='saveBabyInfoContent'>
                        <div className='saveBabyInfo'>
                            {/* 출생년도,체중 */}
                            <p className='saveBabyAge'>출생년도</p>
                            <input id='babyInfoInput2' placeholder="출생년도" onChange={(e) => setKid_Age(e.target.value)} />
                            <p className='saveBabyWeight'>체중</p>
                            <input id='babyInfoInput3' placeholder="체중" onChange={(e) => setKid_Weight(e.target.value)} />
                            <p className='saveBabyKg'>kg</p>
                        </div>
                    </div>
                    <div className='saveBabyInfoContent'>
                        <div className='saveBabyInfo'>
                            {/* 키 */}
                            <p className='saveBabyKey'>키</p>
                            <input id='babyInfoInput4' placeholder="키" onChange={(e) => setKid_Key(e.target.value)} />
                            <p className='saveBabyCm'>cm</p>
                        </div>
                    </div>

                    <button className='saveBabyInfoBtn' onClick={()=>saveKidInfo()}>등록하기</button>


                </div>
            </div>
        </div>

    )
}

export default AvatarAddFrom