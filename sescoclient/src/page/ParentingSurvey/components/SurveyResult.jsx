import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Survey.css'
import tip_img from '../../../img/surveyResult.png'

const SurveyResult = ({ bundle }) => {

    console.log('bundle result',bundle)
    const socialTotal = bundle[0].total
    const socialCheck = bundle[0].check
    const socialCheckList = bundle[0].checkList

    const languageTotal = bundle[1].total
    const languageCheck = bundle[1].check
    const languageCheckList = bundle[1].checkList

    const brainTotal = bundle[2].total
    const brainCheck = bundle[2].check
    const brainCheckList = bundle[2].checkList

    const physicalTotal = bundle[3].total
    const physicalCheck = bundle[3].check
    const physicalCheckList = bundle[3].checkList


    const [tipResponse, setTipResponse] = useState()


    useEffect(() => {
        axios.post('http://localhost:8081/sesco/survey/agetip', {
            hsv_seq: 6,
        }).then((res) => {
            console.log(res.data)
            setTipResponse(res.data)
        })
    }, [])


    return (

        <div>
            <div className='survey-all'>
                <div className='survey-result-Table-container'>
                    <div className='we-kid'>
                        <h4>우리 아이는</h4>
                    </div>
                    <table className='survey-result-Table'>
                        <tbody>
                            <tr >
                                <td className='table-social-category'>사회/정서적 영역/</td>
                                <td className='table-result'>{socialCheck === socialTotal ? "충분" : "불충족"}</td>
                                <td className='table-result'>{socialTotal}중 {socialTotal - socialCheck}개 부족</td>

                            </tr>
                            <tr>
                                <td className='table-language-category'>언어/의사소통 영역</td>
                                <td className='table-result'>{languageCheck == languageTotal ? "충분" : "불충족"}</td>
                                <td className='table-result'>{languageTotal}중 {languageTotal - languageCheck}개 부족</td>
                            </tr>
                            <tr>
                                <td className='table-brain-category'>인지(학습,사고,문제해결능력)</td>
                                <td className='table-result'>{brainCheck === brainTotal ? "충분" : "불충족"}</td>
                                <td className='table-result'>{brainTotal}중 {brainTotal - brainCheck}개 부족</td>
                            </tr>
                            <tr>
                                <td className='table-physical-category'>운동/신체발달 영역</td>
                                <td className='table-result'>{physicalCheck === physicalTotal ? "충분" : "불충족"}</td>
                                <td className='table-result'>{physicalTotal}중 {physicalTotal - physicalCheck}개 부족</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='Survey-tip'>
                    {tipResponse && (
                        <div className='surveyTip-container'>
                            <div className='surveyTip-img'>
                                <img src={tip_img}></img>
                            </div>
                            <div className='surveyTip-content'>
                                {tipResponse.map((item, index) => (
                                    <li key={index}>{item.hsvt_content}</li>
                                ))}
                            </div>

                        </div>
                    )}
                </div>
                {/*<button className='close-modal-button' onClick={()=>bundle(false)}>뒤로 가기</button>*/}
            </div>
        </div>

    )
}

export default SurveyResult