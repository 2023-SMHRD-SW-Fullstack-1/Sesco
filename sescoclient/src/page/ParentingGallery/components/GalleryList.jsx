import React, { useState } from 'react';
import GalleryImg from './GalleryImg';
import './gallerylist.css'



const GalleryList = ({list}) => {

  const [modal,setModal] = useState(false);
  
  const handleOpenModal=(index)=>{
    console.log('index',index);
    setModal(true)
  }

console.log(list);

  return (
    <div className='gallery-list-container'>
      <div>
      
            {list.map((list,index)=><p key={index} onClick={()=>handleOpenModal(index)}>{list}</p>)} 
              <div>
                <GalleryImg index={list}/>
              </div>
              
        
      </div>
    </div>
  )
}

export default GalleryList