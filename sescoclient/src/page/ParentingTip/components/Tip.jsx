import React, { useEffect, useState } from 'react'
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


const Tip = ({user_id}) => {
    const [datas, setDatas] = useState(['']);
    const [activeButtonId, setActiveButtonId] = useState('0');
    const imgs = [babyTip0, babyTip1, babyTip2, babyTip3, babyTip4, babyTip5, babyTip6, babyTip7, babyTip8]
    useEffect(() => {
        axios.get('http://localhost:5000/tip')
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

    }, []);

    const handleToggle = (buttonId) => {
        
            setActiveButtonId(buttonId);
    };



    return (
        <>
            <div className='timeline' >
                <div style={{ width: '920px', height: '125px', backgroundImage: `url("${TipImg}")`, backgroundPosition: 'center' }}>
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
                <div className='tip-content-container'>
                    {activeButtonId == 0 ?
                        <div className='tip-mainContent'>
                            <img className='tipMainImg' width={'500px'} src={imgs[0]} />
                            <h3>연령별 아이 특성을 확인하여 <br />육아 TIP을 받아보세요!</h3>

                        </div>
                        :
                        <div className='tip-content'>
                            <div className='mainContent'>
                                <img width={'500px'} src={imgs[activeButtonId]} />
                                <div className='mainContentContext'>
                                    <h1>{datas[activeButtonId]?.ageT}</h1>
                                    <h3>주요발달 특성</h3>
                                    {datas[activeButtonId]?.mainContext?.map((one, index) => <li className='mainText' key={index}>{one}</li>)}
                                </div>
                            </div>
                            <h4>신체발달</h4>
                            {datas[activeButtonId]?.detailOne?.map((one, index) => <li key={index}>{one}</li>)}
                            <h4>정서발달</h4>
                            {datas[activeButtonId]?.detailTwo?.map((one, index) => <li key={index}>{one}</li>)}
                            <h4>사회성발달</h4>
                            {datas[activeButtonId]?.detailTree?.map((one, index) => <li key={index}>{one}</li>)}
                            <h4>언어발달</h4>
                            {datas[activeButtonId]?.detailFour?.map((one, index) => <li key={index}>{one}</li>)}
                            <h4>인지발달</h4>
                            {datas[activeButtonId]?.detailFive?.map((one, index) => <li key={index}>{one}</li>)}
                        </div>
                    }

                </div>
                <button className="btn-4"><span>아이 설문하러 가기 <FiBookOpen /></span></button>
            </div>

        </>
    )
}

export default Tip