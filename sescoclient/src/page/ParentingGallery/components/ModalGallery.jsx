// Modal.js

import React, { useState } from "react";
import ImgSlider from "./ImgSlider";
import './citygallery.css'

function ModalGallery({closeModal, imgInfo}) {

  return (
    
    <div className="gallery-modal" onClick={()=>closeModal(false)}>
      <div className="gallery-modal-body" onClick={(e) => e.stopPropagation()}>
        <ImgSlider imgInfo={imgInfo}/>
      </div>
    </div>
  );
}

export default ModalGallery;
