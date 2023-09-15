// Modal.js

import React, { useState } from "react";
import './gallerymap.css'
import ImgSlider from "./ImgSlider";

function ModalGallery({closeModal}) {

  return (
    
    <div className="gallery-modal" onClick={()=>closeModal(false)}>
      <div className="gallery-modal-body" onClick={(e) => e.stopPropagation()}>
        <button className="gallery-modal-close-btn" onClick={()=>closeModal(false)}>
          ✖
        </button>
        <ImgSlider />
      </div>
    </div>
  );
}

export default ModalGallery;
