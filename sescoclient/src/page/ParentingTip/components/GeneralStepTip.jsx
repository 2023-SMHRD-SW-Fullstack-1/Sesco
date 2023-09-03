import React, { useState } from 'react'
import './gst.css'

const GeneralStepTip = ({number, title, content}) => {

const [isOpen, setIsOpen] = useState(false)


// const toggle = ()=>{
//     setIsOpen(!isOpen)
// }
  return (
    <div className='tip-general-container'>
        {/* 번호 */}
        <div className='tip-general-accordion-number'>
            {number}
        </div>

        {/* 토글부분 */}
        <button className='tip-general-accordion-head' onClick={()=>setIsOpen(!isOpen)}>
           {/* head 내용 */}
           {title}
        </button>
        <div className={`tip-general-content-body ${isOpen ? 'open' : 'close'}`}>
          {isOpen &&  
            <div className='tip-general-accordion-text'>
              <span>
                {/*  팁 내용 */}
               {content}
              </span>
            </div>
          }
        </div>
    </div>
  )
}

export default GeneralStepTip