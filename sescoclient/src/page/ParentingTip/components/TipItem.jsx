import React, { useState } from 'react'
import './accordion.css'

const TipItem = ({number, title, content}) => {

    const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='tip-accordion-item-container'>
        {/* 번호 */}
        <div className='tip-accordion-item-number'>
            0{number}
        </div>

        {/* 토글부분 */}
        <button className='tip-accordion-item-head' onClick={()=>setIsOpen(!isOpen)}>
        {/* head 내용 */}
        {title}
        </button>
        <div className={`tip-accordion-item-body ${isOpen ? 'open' : 'close'}`}>
            {isOpen &&
            <div className='tip-accordion-item-text'>
                    <span>{content}</span>
            </div>
            }
        </div>
    </div>
  )
}

export default TipItem