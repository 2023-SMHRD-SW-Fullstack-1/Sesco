import ImageGallery from "react-image-gallery";
import React, { useEffect } from 'react'

const ImgSlider = ({imgInfo}) => {
    console.log(imgInfo)
    const images = [
        // {
        //   original : imgInfo[2].img,
        //   thumbnail : imgInfo[2].img
        // },
    
      ];

      //이미지 정보 바인딩
      useEffect(()=>{
        const info= []
        imgInfo.map((name)=>
          images.push({
            original : name.img,
            thumbnail : name.img
          })
        )
      },{})
  return (
   <ImageGallery items={images} />
  )

}

export default ImgSlider