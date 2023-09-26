import React, { useEffect, useState, useRef } from 'react'
import './Tip.css'
import TipImg from '../../../img/TipImg.png'
import { FiBookOpen } from "react-icons/fi";
import axios from 'axios';
import babyTip0 from '../../../img/baby0tip.png'
import babyTip1 from '../../../img/baby1tip.png'
import babyTip2 from '../../../img/baby2tip.png'
import babyTip3 from '../../../img/baby3tip.png'
import babyTip4 from '../../../img/baby4tip.png'
import babyTip5 from '../../../img/baby5tip.png'
import babyTip6 from '../../../img/baby6tip.png'
import babyTip7 from '../../../img/baby7tip.png'
import babyTip8 from '../../../img/baby8tip.png'
import Survey from '../../ParentingSurvey/components/Survey';
import Modal from '../../ParentingSurvey/Modal';

const Tip = ({ user_id }) => {
    const [datas, setDatas] = useState(['']);
    const [activeButtonId, setActiveButtonId] = useState('0');
    const imgs = [babyTip0, babyTip1, babyTip2, babyTip3, babyTip4, babyTip5, babyTip6, babyTip7, babyTip8]
    const [surveyUp, setSurveyUp] = useState(false); // 모달 열림/닫힘 상태 관리
    //설문에 필요한 아이정보 확인 (null인 경우에는 선택을 통해 추가해줄 것 )
    const [kidInfoList, setKidInfoList] = useState([])
    const [selectedKid, setSelectedKid] = useState()
    const kid_seq = sessionStorage.getItem("kid_seq")
    const [sendKid, setSendKid] = useState()
    const NONE = "아이를 선택해주세요"
    // 모달 열기 함수
    const openSurveyModal = () => {
        // main2-> 아이정보 값을 받아와서 값이 있다면 openModal
        // 아이정보 null  ->  user_id 의 kid 값이 있는지 확인후  있다면 -> 아이 선택 옵션 
        // null-> 아이 등록 하세요 알림 (등록하겠습니까  예 버튼 -> main2, 아니오 버튼 -> 취소 )
        //      선택되어있는 아이의 정보를 넘겨주면 됨
        
        if(selectedKid == null && kid_seq!=null && selectedKid != NONE){
            const tempList = kidInfoList.filter((kid) => kid.kid_seq === kid_seq)
            setSendKid(tempList[0])
            setSurveyUp(true);
        }else if (selectedKid == NONE || selectedKid == null) {
            alert("아이를선택해야합니다")
        } else {
            const tempList = kidInfoList.filter((kid) => kid.kid_seq === selectedKid)
            setSendKid(tempList[0])
            console.log(sendKid)
            setSurveyUp(true);
        }

    };

    // 선택된 옵션 확인하기
    const handleChange = (event) => {
        // 선택된 아이의 seq값을
        const selectedOption = event.target.value;

        // 선택한 아이이름과 같은 같이가 있는지 찾아서 객체를 보내줌
        setSelectedKid(selectedOption);

        console.log(selectedKid)
    };


    // 모달 닫기 함수
    const closeSurveyModal = () => {
        setSurveyUp(false);
    };

    useEffect(() => {
        console.log(surveyUp);
        axios.get('http://172.30.1.56:5000/tip')
            .then(res => {
                setDatas(res.data);
                console.log(res.data);
            })
            .catch(error => {
                console.error(error);
            });


        {/* 유저한테 아이가 있는지 확인 
            axios.post('http://localhost:8081/kid/'){
                [아이1, 아이2, 아이3]
            } */}
        axios.post('http://172.30.1.56:8081/sesco/kid/getkidlist', {
            "user_id": user_id
        }).then((res) => {
            setKidInfoList(res.data)
        }).catch(error => {
            console.error(error);
        });
    }, []);

    const handleToggle = (buttonId) => {

        setActiveButtonId(buttonId);
    };



    return (
        <div className='tipDiv'>
            <div className='timeline' >
                <div style={{ width: '900px', height: '125px', backgroundImage: `url("${TipImg}")`, backgroundPosition: 'center' }}>
                    <div className='ageBtns1'>
                        <nav className='tipNav'>
                            <ul>
                                <li className='timelinLi1' onClick={() => handleToggle('1')}>
                                    {datas[1]?.ageT}
                                    <span></span><span></span><span></span><span></span>
                                </li>
                                <li className='timelinLi2' onClick={() => handleToggle('2')}>
                                    {datas[2]?.ageT}
                                    <span></span><span></span><span></span><span></span>
                                </li>
                                <li className='timelinLi3' onClick={() => handleToggle('3')}>
                                    {datas[3]?.ageT}
                                    <span></span><span></span><span></span><span></span>
                                </li>
                                <li className='timelinLi4' onClick={() => handleToggle('4')}>
                                    {datas[4]?.ageT}
                                    <span></span><span></span><span></span><span></span>
                                </li>
                            </ul>
                        </nav>
                        <div className='ageBtns2'>
                            <nav className='tipNav'>
                                <ul>
                                    <li className='timelinLi5' onClick={() => handleToggle('5')}>
                                        {datas[5]?.ageT}
                                        <span></span><span></span><span></span><span></span>
                                    </li>
                                    <li className='timelinLi6' onClick={() => handleToggle('6')}>
                                        {datas[6]?.ageT}
                                        <span></span><span></span><span></span><span></span>
                                    </li>
                                    <li className='timelinLi7' onClick={() => handleToggle('7')}>
                                        {datas[7]?.ageT}
                                        <span></span><span></span><span></span><span></span>
                                    </li>
                                    <li className='timelinLi8' onClick={() => handleToggle('8')}>
                                        {datas[8]?.ageT}
                                        <span></span><span></span><span></span><span></span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div>
            <div className='kidSurveySelect'>
                    <button className="btn-4" onClick={() => openSurveyModal()}><span>아이 설문하러 가기 <FiBookOpen /></span></button>

                    <select onChange={handleChange} className='kidSelect' value={kid_seq||''}>
                        <option>{NONE}</option>
                        {kidInfoList.map((kid,index) => (
                            <option key={index} value={kid.kid_seq}> {kid.kid_name} </option>
                        ))}
                    </select>

                </div>
                <div className='tip-content-container'>
                    {activeButtonId == 0 ?
                        <div className='tip-mainContent'>
                            <img className='tipMainImg' width={'500px'} src={imgs[0]} />
                            <h3>연령별 아이 특성을 확인하여 <br />육아 TIP을 받아보세요!</h3>

                        </div>
                        :
                        <div className='tip-content'>
                            <div className='mainContent'>
                                <img width={'480px'} src={imgs[activeButtonId]} />
                                <div className='mainContentContext'>
                                    <h1>{datas[activeButtonId]?.ageT}</h1>
                                    <h3>주요발달 특성</h3>
                                    {datas[activeButtonId]?.mainContext?.map((one, index) => <li className='mainText' key={index}>{one}</li>)}
                                </div>
                            </div>
                            <br/>
                            <h4>신체발달</h4>
                            {datas[activeButtonId]?.detailOne?.map((one, index) => <li key={index}>{one}</li>)}
                            <br/>
                            <h4>정서발달</h4>
                            {datas[activeButtonId]?.detailTwo?.map((one, index) => <li key={index}>{one}</li>)}
                            <br/>
                            <h4>사회성발달</h4>
                            {datas[activeButtonId]?.detailTree?.map((one, index) => <li key={index}>{one}</li>)}
                            <br/>
                            <h4>언어발달</h4>
                            {datas[activeButtonId]?.detailFour?.map((one, index) => <li key={index}>{one}</li>)}
                            <br/>
                            <h4>인지발달</h4>
                            {datas[activeButtonId]?.detailFive?.map((one, index) => <li key={index}>{one}</li>)}
                        </div>
                    }

                </div>
               
                {surveyUp && <Modal kid={sendKid} surveyUp={surveyUp} closeSurveyModal={closeSurveyModal} />}

            </div>

        </div>
    )
}

export default Tip