import React from 'react'
import GeneralStepTip from './GeneralStepTip'
import './gst.css'

const TipAccordion = ({titleList, contentList}) => {
  return (
    <div className='accordion-total-container'>
    {titleList.map((title, idx)=>
    <div className='tip-accordion-item'>
     <GeneralStepTip number={idx+1} title={title} content={contentList[idx]}></GeneralStepTip>
    </div>
    )}
    </div>
  )
}

export default TipAccordion