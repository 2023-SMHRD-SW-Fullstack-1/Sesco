import React, { useEffect, useState } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './citygallery.css'
import ImgSlider from './ImgSlider';
import ModalGallery from './ModalGallery';


const CityGallery = ({imgInfoList, cityName}) => {

  const [itemData, setItemData] = useState()
  const [filteredImgInfo, setFilteredImgInfo] = useState()
  const [isFocus, setIsFocus] = useState(false)
  
  console.log(imgInfoList)

  useEffect(()=>{
    
    const imgTemp = imgInfoList.filter((info)=> info.secondName == cityName)
    setFilteredImgInfo([...imgTemp])


    const temp=[]
    imgTemp.map((info)=>(
      temp.push(
        {
          img : `data:image/jpeg;base64,${info.imgName}`,
          // title : 
        }
      )
    ))
    setItemData([...temp])


  },[]) 

  

  const imgClickEvent=(e)=>{
    console.log(e.target.alt)
    setIsFocus(true)

  }
  
  return (
    <>
    {itemData != null && 
    <ImageList
      className='gallery-img-list'
      sx={{ width: "100%", height: "85%" }}
      variant="quilted"
      cols={4}
      rowHeight={121}
      >
      {itemData.map((item, index) => (
        <ImageListItem key={index} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            className='gallery-img-item'
            src = {item.img}
            width={121}
            height={121}
            alt={index}
            loading="lazy"
            onClick={(e)=>imgClickEvent(e)}
          />
        </ImageListItem>
      ))}
    </ImageList>
    }
    {isFocus && <ModalGallery closeModal={setIsFocus} />}
    </>
    
  )
}

export default CityGallery
