import React from 'react'

const GalleryGuide = () => {
  return (
    <div style={{display:"flex", justifyContent:"left", alignItems:"center", flexDirection:"column"}}>
        <img src='/galleryimg/localselect.png' style={{marginTop:"7%"}} width={"50%"} height={"50%"}/>
        <h2 style={{fontFamily:'insungitCutelivelyjisu', fontSize:'25px'}}> 지도에서 원하는 지역을 선택해보세요 </h2>
    </div>
  )
}

export default GalleryGuide