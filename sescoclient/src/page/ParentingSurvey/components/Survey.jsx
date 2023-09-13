import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SurveyResult from './SurveyResult';
import PreSurveyResult from './PreSurveyResult';
import './Survey.css';

function Survey({ user_id }) {
    const category = ['사회/정서적 영역', '언어/의사소통 영역', '인지(학습,사고,문제해결력)', '운동/신체발달 영역'];

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [resultBundle, setResultBundle] = useState(null);
    const [socialCheckList, setSocialCheckList] = useState([]);
    const [languageCheckList, setLanguageCheckList] = useState([]);
    const [brainCheckList, setBrainCheckList] = useState([]);
    const [physicalCheckList, setPhysicalCheckList] = useState([]);
    const [showPreSurveyResult, setShowPreSurveyResult] = useState(false);

    const config = {
        headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    };

    function addCheckList(item) {
        if (item.hsvd_category === category[0]) {
            !socialCheckList.includes(item.hsvd_seq) && setSocialCheckList([...socialCheckList, item.hsvd_seq]);
        } else if (item.hsvd_category === category[1]) {
            !languageCheckList.includes(item.hsvd_seq) && setLanguageCheckList([...languageCheckList, item.hsvd_seq]);
        } else if (item.hsvd_category === category[2]) {
            !brainCheckList.includes(item.hsvd_seq) && setBrainCheckList([...brainCheckList, item.hsvd_seq]);
        } else if (item.hsvd_category === category[3]) {
            !physicalCheckList.includes(item.hsvd_seq) && setPhysicalCheckList([...physicalCheckList, item.hsvd_seq]);
        }
    }

    function removeCheckList(item) {
        if (item.hsvd_category === category[0]) {
            const tempList = socialCheckList.filter(id => id !== item.hsvd_seq);
            socialCheckList.includes(item.hsvd_seq) && setSocialCheckList(tempList);
        } else if (item.hsvd_category === category[1]) {
            const tempList = languageCheckList.filter(id => id !== item.hsvd_seq);
            languageCheckList.includes(item.hsvd_seq) && setLanguageCheckList(tempList);
        } else if (item.hsvd_category === category[2]) {
            const tempList = brainCheckList.filter(id => id !== item.hsvd_seq);
            brainCheckList.includes(item.hsvd_seq) && setBrainCheckList(tempList);
        } else if (item.hsvd_category === category[3]) {
            const tempList = physicalCheckList.filter(id => id !== item.hsvd_seq);
            physicalCheckList.includes(item.hsvd_seq) && setPhysicalCheckList(tempList);
        }
    }

    const submitResult = async () => {
        setResultBundle([
            { total: filteredData1.length, check: socialCheckList.length, checkList: socialCheckList },
            { total: filteredData2.length, check: languageCheckList.length, checkList: languageCheckList },
            { total: filteredData3.length, check: brainCheckList.length, checkList: brainCheckList },
            { total: filteredData4.length, check: physicalCheckList.length, checkList: physicalCheckList }
        ]);
        const resultsData = {
            totalCheckList: [...socialCheckList,...languageCheckList,...brainCheckList,...physicalCheckList],
            // kid_seq:
        };
        try {
            const response = await axios.post('http://localhost:8081/sesco/survey/saveresult', resultsData, config);

            if (response.status === 200) {
                console.log('결과가 성공적으로 저장되었습니다.');
                console.log('요청데이터 결과', resultsData);
            }
        } catch (error) {
            console.error('결과 저장 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8081/sesco/survey/agechecklist', {
                    hsv_seq: 6,
                });
                const responseData = response.data;
                setData(responseData);
            } catch (error) {
                console.error('데이터를 불러오는 중 오류 발생:', error);
                setData([]);
            } finally {
                // 데이터 로딩이 완료되면 isLoading 상태를 false로 설정합니다.
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const filteredData1 = data.filter((item) => item.hsvd_category === category[0]);
    const filteredData2 = data.filter((item) => item.hsvd_category === category[1]);
    const filteredData3 = data.filter((item) => item.hsvd_category === category[2]);
    const filteredData4 = data.filter((item) => item.hsvd_category === category[3]);

    return (
        <div className="survey">
            <div className="survey-top-container">
                <div className="survey-title-container">
                    <h2 className="survey-title" id="survey_title">2세</h2>
                </div>
            </div>
            {/* 모달 화면 (설문/결과) */}
            {resultBundle ? (
                <SurveyResult bundle={resultBundle} />
            ) : (
                showPreSurveyResult ? (
                    <PreSurveyResult setShowPreSurveyResult={setShowPreSurveyResult} />
                ) : (
                    <div className="survey-middle-container">
                        <div className="surBox-container">
                            {/* 사회/정서 */}
                            <div className="surBox1">
                                <div className="sur_category">
                                    <h4>{category[0]}</h4>
                                </div>
                                <div className="sur_content_detail">
                                    {filteredData1.map((item) => (
                                        <div className="survey_btncheck" key={item.id}>
                                            <li>{item.hsvd_content}</li>
                                            <button type="checkbox" className="survey_oBtn" id="socialObtn" onClick={() => addCheckList(item)}>o</button>
                                            <button type="checkbox" className="survey_xBtn" id="socialXbtn" onClick={() => removeCheckList(item)}>x</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* 언어/의사소통 */}
                            <div className="surBox1">
                                <div className="sur_category">
                                    <h4>{category[1]}</h4>
                                </div>
                                <div className="sur_content_detail">
                                    {filteredData2.map((item) => (
                                        <div className="survey_btncheck" key={item.id}>
                                            <li>{item.hsvd_content}</li>
                                            <button type="checkbox" className="survey_oBtn" id="cmuObtn" onClick={() => addCheckList(item)}>o</button>
                                            <button type="checkbox" className="survey_xBtn" id="cmuXbtn" onClick={() => removeCheckList(item)}>x</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* 인지 */}
                            <div className="surBox1">
                                <div className="sur_category">
                                    <h4>{category[2]}</h4>
                                </div>
                                <div className="sur_content_detail">
                                    {filteredData3.map((item) => (
                                        <div className="survey_btncheck" key={item.id}>
                                            <li>{item.hsvd_content}</li>
                                            <button type="checkbox" className="survey_oBtn" id="brainObtn" onClick={() => addCheckList(item)}>o</button>
                                            <button type="checkbox" className="survey_xBtn" id="brainXbtn" onClick={() => removeCheckList(item)}>x</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* 운동신체발달 */}
                            <div className="surBox1">
                                <div className="sur_category">
                                    <h4>{category[3]}</h4>
                                </div>
                                <div className="sur_content_detail">
                                    {filteredData4.map((item) => (
                                        <div className="survey_btncheck" key={item.id}>
                                            <li>{item.hsvd_content}</li>
                                            <button type="checkbox" className="survey_oBtn" id="pysObtn" onClick={() => addCheckList(item)}>o</button>
                                            <button type="checkbox" className="survey_xBtn" id="pysXbtn" onClick={() => removeCheckList(item)}>x</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="survey-bottom-container">
                            <button className="survey_btnPreResult" onClick={() => setShowPreSurveyResult(true)}>이전 설문 불러오기</button>
                            <button className="btnResult" onClick={submitResult}>결과보기</button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default Survey;