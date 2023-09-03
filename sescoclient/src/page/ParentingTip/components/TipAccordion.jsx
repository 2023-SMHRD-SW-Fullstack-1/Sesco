import React from 'react'
import TipItem from './TipItem'

const TipAccordion = ({titleList, contentList}) => {
  return (
    <div className='accordion-total-container'>
    {titleList.map((title, idx)=>
    <div className='tip-accordion-item'>
     <TipItem number={idx+1} title={title} content={contentList[idx]}></TipItem>
    </div>
    )}
    </div>
  )
}

export default TipAccordion