import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Survey.css'

const SurveyResult = ({ bundle }) => {

    console.log(bundle)
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
                <div>
                    <div className='survey-result-Table-container'>
                        <table className='survey-result-Table'>
                            <tbody>
                                <tr>
                                    <td>사회/정서적 영역/</td>
                                    <td>{socialCheck === socialTotal ? "충분" : "불충족"}</td>
                                    <td>{socialTotal}중 {socialTotal - socialCheck}개 부족</td>

                                </tr>
                                <tr>
                                    <td>언어/의사소통 영역</td>
                                    <td>{languageCheck == languageTotal ? "충분" : "불충족"}</td>
                                    <td>{languageTotal}중 {languageTotal - languageCheck}개 부족</td>
                                </tr>
                                <tr>
                                    <td>인지(학습,사고,문제해결력)</td>
                                    <td>{brainCheck === brainTotal ? "충분" : "불충족"}</td>
                                    <td>{brainTotal}중 {brainTotal - brainCheck}개 부족</td>
                                </tr>
                                <tr>
                                    <td>운동/신체발달 영역</td>
                                    <td>{physicalCheck === physicalTotal ? "충분" : "불충족"}</td>
                                    <td>{physicalTotal}중 {physicalTotal - physicalCheck}개 부족</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='Survey-tip-container'>
                        {tipResponse && (
                            <div>
                                <h3>팁</h3>
                                {tipResponse.map((item, index) => (
                                    <li key={index}>{item.hsvt_content}</li>
                                ))}
                            </div>
                        )}
                    </div>
                    {/*<button className='close-modal-button' onClick={()=>bundle(false)}>뒤로 가기</button>*/}
                </div>
            </div>

    )
}

export default SurveyResult