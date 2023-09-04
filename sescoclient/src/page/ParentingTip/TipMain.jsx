import React from 'react'
import './tip.css'
import AccordionList from './components/AccordionList'
const TipMain = () => {

  const titleList = [1,2,3,4,5]
  const contentList = ['a',`b`,'c','d','e']

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
          <AccordionList></AccordionList>
        </div>
      </div>
    
    </>
  )
}

export default TipMain