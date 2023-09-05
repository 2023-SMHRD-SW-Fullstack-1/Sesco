import React from 'react'
import map from '../../../img/map.png'
import marker from '../../../img/marker.png'
import './Map.css'

const GalleryMap = () => {

  const region = ['keonggi', 'gangwon', 'north-chungcheong', 'south-chungcheong', 'north-gyeongsang', 'south-gyeongsang', 'north-jeonla', 'south-jeonla', 'jeju']

  return (
    <div className='gallery-map-container'>
      <div className = 'gallery-map-item' style={
        {
          backgroundImage : `url("${map}")`,
          height : '1800px',
          width : '1600px',
          'background-repeat' : 'no-repeat',
          'background-size' : 'cover'
        }
      }>
        {region.map((local)=>
           <div key={local} className = {`gallery-map-marker ${local}`} style={{backgroundImage : `url("${marker}")`}}></div>
        )}       
      </div>
    </div>
  )
}

export default GalleryMap