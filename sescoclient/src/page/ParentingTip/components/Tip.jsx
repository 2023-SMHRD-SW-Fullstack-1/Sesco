import React, { useEffect, useState } from 'react'
import './Tip.css'
import TipImg from '../../../img/TipImg.png'
import { FiBookOpen } from "react-icons/fi";
import axios from 'axios';


const Tip = () => {
    const [datas, setDatas] = useState(['']);
    const [activeButtonId, setActiveButtonId] = useState('0');

    useEffect(() => {
        axios.get('http://localhost:5000/tip')
            .then(res => {
                setDatas(res.data);
                console.log(res.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleToggle = (buttonId) => {
        if (activeButtonId === buttonId) {
            setActiveButtonId(0);
        } else {
            setActiveButtonId(buttonId);
        }
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
                    <div className='tip-content'>
                        {datas[activeButtonId].context?.map((context,index)=><li key={index}>{context}</li>)}
                    </div>
                </div>
                <button className="btn-4"><span>아이 설문하러 가기 <FiBookOpen /></span></button>
            </div>

        </>
    )
}

export default Tip