import React from 'react'
import AccordionItem from './AccordionItem'
import './accordion.css'

const AccordionList = ({titleList, contentList}) => {

  return (
    <div className='accordion'>
        {titleList.map((title, index)=>
          <AccordionItem key={index} number={index+1} title={title} content={contentList[index]} ></AccordionItem>
          )
        }
    </div>
  )
}

export default AccordionList