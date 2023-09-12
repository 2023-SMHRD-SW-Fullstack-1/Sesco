import React from 'react'

const PreSurveyResult = ({closePreSurveyResult, setShowPreSurveyResult}) => {

  const user_id = sessionStorage.getItem('user_id');
  
  return (
    <div className='pre-survey-result-modal'>
      <div className='survey-top-container'>
        <div className='survey-title-container'>
          <h2 className='survey-title' id='survey_title'>{user_id}님의 이전 체크리스트</h2>
        </div>
      </div>
      <div>
        이전설문 체크리스트 내용 나오는 곳.
      </div>
      <button className='close-modal-button' onClick={()=>setShowPreSurveyResult(false)}>닫기</button>
    </div>
  )
}

export default PreSurveyResult