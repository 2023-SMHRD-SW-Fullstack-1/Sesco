import React from 'react'
import './Gallery.css';
import Banner from './components/Banner';
import GalleryMapItem from './components/GalleryMapItem'


const Gallery = () => {
  const list =["광주","화순","나주","담양","목포"];
  return (
        <div>
          <Banner/>
          <GalleryMapItem></GalleryMapItem>
        </div>
  )
}

export default Gallery