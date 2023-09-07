import React, { useState } from 'react'
import './accordion.css'

const AccordionItem = ({number, title, content}) => {

  const [isOpen, setIsOpen] = useState(false)

  return (
        <div className={`item ${isOpen && 'open'}`} onClick={()=>{setIsOpen(!isOpen)}}>
            <p className="number">
                0{number}
            </p>
            <p className="text">{title}</p>
            <div className="hidden-box">
                {content}
            </div>
        </div>
  )
}

export default AccordionItem