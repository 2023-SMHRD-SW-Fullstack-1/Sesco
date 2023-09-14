import React from 'react'

const PreSurveyResult = ({ closePreSurveyResult, setShowPreSurveyResult }) => {

  const user_id = sessionStorage.getItem('user_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8081/sesco/survey/presurveylist', {
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




  return (
    <div className='pre-survey-result-modal'>
      <div className='survey-top-container'>
        <div className='survey-title-container'>
          <h2 className='survey-title' id='survey_title'>{user_id}님의 이전 체크리스트</h2>
        </div>
      </div>

      <div>
        이전 체크리스트 불러오는 곳
      </div>

      <button className='close-modal-button' onClick={() => setShowPreSurveyResult(false)}>닫기</button>
    </div>
  )
}

export default PreSurveyResult