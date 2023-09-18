// Modal.js

import React, { useState } from "react";
import './components/Survey.css'
import Survey from "./components/Survey";

function Modal({kid, surveyUp, closeSurveyModal}) {
  
  // function closeModal() {
  //   props.closeModal();
  // }

  return (
    
    <div className="Modal" onClick={closeSurveyModal}>
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeSurveyModal}>
          ✖
        </button>
        {surveyUp && <Survey kid={kid}></Survey>}
        
      </div>
    </div>
  );
}

export default Modal;
