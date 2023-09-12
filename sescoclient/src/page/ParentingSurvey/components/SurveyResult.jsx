// import React, { useState } from 'react'


// const SurveyResult = ({bundle}) => {
// <>
    
// </>
// //         // ox 버튼 체크시 결과(정상, 부족)
// //         const [surveyResult1, setSurveyResult1] =useState('정상');
// //         const [surveyResult2, setSurveyResult2] =useState('정상');
// //         const [surveyResult3, setSurveyResult3] =useState('정상');
// //         const [surveyResult4, setSurveyResult4] =useState('정상');

// //             //x count
// //     const [xResult1,setXResult1] = useState(0) ;
// //     const [xResult2,setXResult2] = useState(0) ;
// //     const [xResult3,setXResult3] = useState(0) ;
// //     const [xResult4,setXResult4] = useState(0) ;


//   return (
//     <div>
//         <div>
//                     <div className='survey-result-Table-container'>
//                         <table className='survey-result-Table'>
//                             <tbody>
//                                 <tr>
//                                     <td>사회/정서적 영역/</td>
//                                     <td>{surveyResult1}</td>
//                                     <td>{filteredData1.length}중 {xResult1}개 부족</td>
                                    
//                                 </tr>
//                                 <tr>
//                                     <td>언어/의사소통 영역</td>
//                                     <td>{surveyResult2}</td>
//                                     <td>{xResult2}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>인지(학습,사고,문제해결력)</td>
//                                     <td>{surveyResult3}</td>
//                                     <td>{xResult3}</td>
//                                 </tr>
//                                 <tr>
//                                     <td>운동/신체발달 영역</td>
//                                     <td>{surveyResult4}</td>
//                                     <td>{xResult4}</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className='Survey-tip-container'>
//                         {tipResponse && (
//                             <div>
//                                 <h3>팁</h3>
//                                 {tipResponse.map((item, index) => (
//                                     <li key={index}>{item.hsvt_content}</li>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     <button onClick={() => setResultSurvey(false)}>등등</button>
//                 </div>
//     </div>
//   )
// }

// export default SurveyResult

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Survey.css'


const SurveyResult = ({bundle}) => {
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
    
    // const fetchTipData = async () => {
    //         try {
    //             const response = await axios.post('http://localhost:8081/sesco/survey/agetip', {
    //                 hsv_seq: 6,
    //             });
    //             const resultResponse = response.data;
    //             setTipResponse(resultResponse);
    //         } catch (error) {
    //             console.error('팁 데이터를 불러오는 중 오류 발생:', error);
    //             setTipResponse({});
    //         }
    // };
    const [tipResponse, setTipResponse] = useState()

    
    useEffect(()=>{
        axios.post('http://localhost:8081/sesco/survey/agetip', {
                hsv_seq: 6,
        }).then((res)=>{
            console.log(res.data)
            setTipResponse(res.data)
        })
    },[])


  return (
    <div>
        <div>
                    <div className='survey-result-Table-container'>
                        <table className='survey-result-Table'>
                            <tbody>
                                <tr>
                                    <td>사회/정서적 영역/</td>
                                    <td>{socialCheck===socialTotal ? "충분" : "불충족"}</td>
                                    <td>{socialTotal}중 {socialTotal-socialCheck}개 부족</td>
                                    
                                </tr>
                                <tr>
                                    <td>언어/의사소통 영역</td>
                                    <td>{languageCheck==languageTotal ? "충분" : "불충족"}</td>
                                    <td>{languageTotal}중 {languageTotal-languageCheck}개 부족</td>
                                </tr>
                                <tr>
                                    <td>인지(학습,사고,문제해결력)</td>
                                    <td>{brainCheck===brainTotal ? "충분" : "불충족"}</td>
                                    <td>{brainTotal}중 {brainTotal-brainCheck}개 부족</td>
                                </tr>
                                <tr>
                                    <td>운동/신체발달 영역</td>
                                    <td>{physicalCheck===physicalTotal ? "충분" : "불충족"}</td>
                                    <td>{physicalTotal}중 {physicalTotal-physicalCheck}개 부족</td>
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
{/* <button onClick={() => setResultSurvey(false)}>등등</button> */}
                </div>
    </div>
  )
}

export default SurveyResult