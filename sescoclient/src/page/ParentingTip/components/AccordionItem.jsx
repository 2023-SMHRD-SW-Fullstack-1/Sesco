import React, { useState } from 'react'
import './acc.css'

const AccordionItem = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
        <div className={`item ${isOpen && 'open'}`} onClick={()=>{setIsOpen(!isOpen)}}>
            <p className="number">01</p>
            <p className="text">How much does a website cost?</p>
            <div className="hidden-box">
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam
                dolor, molestiae maiores accusantium consequuntur labore!
            </p>
            <ul>
                <li>Lorem ipsum dolor sit <a href="#test">amet</a> consectetur adipisicing elit.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            </ul>
            </div>
        </div>
  )
}

export default AccordionItem