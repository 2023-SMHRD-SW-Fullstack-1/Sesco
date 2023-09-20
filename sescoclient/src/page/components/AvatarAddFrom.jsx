import React, { useEffect, useState } from 'react'
import avatarBg from '../../img/avatarBg.png'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AvatarAddFrom = () => {


    const user_id = sessionStorage.getItem('user_id');
    const [kid_name, setKid_Name] = useState('');
    const [kid_gender, setKid_Gender] = useState('');
    const [kid_birth, setKid_Age] = useState('');
    const [kid_weight, setKid_Weight] = useState('');
    const [kid_height, setKid_Key] = useState('');

    console.log('kid_name', kid_name, 'kid_birth', kid_birth, 'kid_weight', kid_weight, 'kid_height', kid_height, 'kid_gender', kid_gender, 'user_id', user_id);

    const config = {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    }
    const fetchData = () => {
        
        const requestData = {
            kid_name: kid_name,
            kid_birth: kid_birth,
            kid_weight: kid_weight,
            kid_height: kid_height,
            kid_gender: kid_gender,
            user_id: user_id
        };
        return axios.post(`http://localhost:8081/sesco/kid/register`, requestData, config).then((res) => {
            
            try {
                
                if (res.data) {
                    alert('아이등록 완료')
                    return true;
                } else {
                    alert('등록 실패')
                    return false
                }
                
            } catch {
                
            }
        })
        
    }
    

    const saveKidInfo = () => {

        if(!kid_name || !kid_birth|| !kid_weight || !kid_height|| !kid_gender|| !user_id){
            alert('다시 입력해주세요.');
        }else if(kid_birth.length!=10){
            alert('출생년도를 바르게 입력해주세요')
        }else{
            fetchData().then((value) => {
                if (value) {
                    window.location.replace('/main');
                } else {
                    alert('다시 입력해주세요.');
                }
            }).catch((error) => {
                alert('다시 입력해주세요.');
                console.error('에러 발생:', error);
                // 에러 처리 로직 추가
            });
        }
            
     
    }

    return (
        
        <div className='avatar'>
            <div className='avatar-container'>
                <img style={{ width: '550px', height: '450px', marginLeft: '10px', marginRight: '10px', borderRadius: '8px' }} src={avatarBg} />
                <div className='avatar-contents'>
                    <div className='saveBabyInfoContent'>
                        {/* 이름, 성별 */}
                        <div className='saveBabyInfo'>
                            <p className='saveBabyName'>이름</p>
                            <input type='text' id='babyInfoInput1' placeholder="아이 이름" onChange={(e) => setKid_Name(e.target.value)} />
                            <p className='saveBabyGender'>성별</p>
                            <div>
                                <Form.Check
                                    inline
                                    label="남"
                                    name="group1"
                                    type="radio"
                                    id={`inline-"radio"-1`}
                                    value='M'
                                    onChange={(e) => setKid_Gender(e.target.value)}
                                />
                                <Form.Check
                                    inline
                                    label="여"
                                    name="group1"
                                    type="radio"
                                    id={`inline-"radio"-2`}
                                    value='W'
                                    onChange={(e) => setKid_Gender(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='saveBabyInfoContent'>
                        <div className='saveBabyInfo'>
                            {/* 출생년도,체중 */}
                            <p className='saveBabyAge'>출생년도</p>
                            <input type='text' id='babyInfoInput2' placeholder="YYYY-MM-DD" onChange={(e) => setKid_Age(e.target.value)} />
                            <p className='saveBabyWeight'>체중</p>
                            <input type='number' id='babyInfoInput3' placeholder="체중" onChange={(e) => setKid_Weight(e.target.value)} />
                            <p className='saveBabyKg'>kg</p>
                        </div>
                    </div>
                    <div className='saveBabyInfoContent'>
                        <div className='saveBabyInfo'>
                            {/* 키 */}
                            <p className='saveBabyKey'>키</p>
                            <input type='number' id='babyInfoInput4' placeholder="키" onChange={(e) => setKid_Key(e.target.value)} />
                            <p className='saveBabyCm'>cm</p>
                        </div>
                    </div>

                    <button className='saveBabyInfoBtn' onClick={() => saveKidInfo()}>등록하기</button>


                </div>
            </div>
        </div>

    )
}

export default AvatarAddFrom