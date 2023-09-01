import React from 'react'
import './tip.css'
import GeneralStepTip from './components/GeneralStepTip'

const TipMain = () => {
  return (
    <>
      <div className='tip-title-img'> 
       <h4 className='tip-title-text'>"USER" 님을 위한 <br /> 육아 Tip </h4>
      </div>
      <div className='tip-content-container'>
        {/* 아바타 공간 */}
        <div className='tip-content-avatar'>
      
        </div>

        {/* 팁공간 */}
        <div className='tip-content-general-tip'>
          <GeneralStepTip></GeneralStepTip>
        </div>
      </div>
    
    </>
  )
}

export default TipMain