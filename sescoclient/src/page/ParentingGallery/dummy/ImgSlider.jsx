import ImageGallery from "react-image-gallery";
import React, { useEffect, useState } from 'react'

const ImgSlider = ({imgInfo}) => {
  const [img, setImg]= useState(null)
  
  
  useEffect(()=>{
    console.log("제발", imgInfo)
      const images = [];
      imgInfo?.map((name)=>
        images.push({
          original : name.img,
          thumbnail : name.img
        })
      )
      setImg([...images])
    },[])

  return (
    <>   
      <ImageGallery items={img} />
    </>

  )

}

export default ImgSlider