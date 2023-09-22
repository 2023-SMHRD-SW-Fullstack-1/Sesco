import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PreSurveyResult = ({ closePreSurveyResult, setShowPreSurveyResult, kid, kidMonth, bundle }) => {
  const category = ['사회/정서적 영역', '언어/의사소통 영역', '인지(학습,사고,문제해결능력)', '운동/신체발달 영역'];
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [socialCheckList, setSocialCheckList] = useState([]);
  const [languageCheckList, setLanguageCheckList] = useState([]);
  const [brainCheckList, setBrainCheckList] = useState([]);
  const [physicalCheckList, setPhysicalCheckList] = useState([]);

  const user_id = sessionStorage.getItem('user_id');

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



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8081/sesco/survey/presurveylist', {
          kid_seq: kid.kid_seq,
          hsv_seq: kidMonth,
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

  const filteredData1 = data.filter((item) => item.hsvd_category === category[0]);
  const filteredData2 = data.filter((item) => item.hsvd_category === category[1]);
  const filteredData3 = data.filter((item) => item.hsvd_category === category[2]);
  const filteredData4 = data.filter((item) => item.hsvd_category === category[3]);




  return (
    <div className="survey">

      <div className='survey-middle-container'>
        <div className='disEnough-container'><h3>✔ 불충족 항목 ✔</h3></div>
        <div className="surBox-container">
          {/* 사회/정서 */}
          <div className="surBox1">
            <div className="sur_category">
              <h5>{category[0]}</h5>
            </div>
            <div className="sur_content_detail">
              {filteredData1.map((item) => (
                <div className="survey_btncheck" key={item.id}>
                  <li>{item.hsvd_content}</li>
                </div>
              ))}
            </div>
          </div>
          {/* 언어/의사소통 */}
          <div className="surBox1">
            <div className="sur_category2">
              <h5>{category[1]}</h5>
            </div>
            <div className="sur_content_detail">
              {filteredData2.map((item) => (
                <div className="survey_btncheck" key={item.id}>
                  <li>{item.hsvd_content}</li>
                </div>
              ))}
            </div>
          </div>
          {/* 인지 */}
          <div className="surBox1">
            <div className="sur_category3">
              <h5>{category[2]}</h5>
            </div>
            <div className="sur_content_detail">
              {filteredData3.map((item) => (
                <div className="survey_btncheck" key={item.id}>
                  <li>{item.hsvd_content}</li>
                </div>
              ))}
            </div>
          </div>
          {/* 운동신체발달 */}
          <div className="surBox1">
            <div className="sur_category4">
              <h5>{category[3]}</h5>
            </div>
            <div className="sur_content_detail">
              {filteredData4.map((item) => (
                <div className="survey_btncheck" key={item.id}>
                  <li>{item.hsvd_content}</li>
                </div>
              ))}
            </div>
          </div >
          <div className="survey-bottom-container">
            <button id='mainloginBtn' className="main1_loginBtn" onClick={() => setShowPreSurveyResult(false)}>
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">닫기</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PreSurveyResult