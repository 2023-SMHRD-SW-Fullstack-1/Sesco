import React, { useState } from 'react'


const AccordionItem = ({list,index}) => {

  const [activeButtonId, setActiveButtonId] = useState(null);

  const handleToggle = (buttonId) => {
      if (activeButtonId === buttonId) {
          setActiveButtonId(null);
      } else {
          setActiveButtonId(buttonId);
      }
  };

  console.log(`accordion${list.id}`);

  return (
    <div className="accordion-item">
    
      <button id={list.id} aria-expanded={activeButtonId && `accordion${list.id}` ? 'true' : 'false'}
        onClick={() => handleToggle(`accordion${list.id}`)}>
        <span className="accordion-title">{list.ageT}</span>
          
        <span className="icon" aria-hidden="true"></span>
      </button>
      {/* 버튼 클릭시 나오는 텍스트 */}
      <div className="accordion-content">
        <p>{list.context}</p>
      </div>
    </div>
  )
}

export default AccordionItem