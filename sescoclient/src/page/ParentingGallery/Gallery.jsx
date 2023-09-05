import React from 'react'
import './gallery.css';
import Banner from './components/Banner';
import GalleryMap from './components/GalleryMap';
import GalleryList from './components/GalleryList';


const Gallery = () => {
  const list =["광주","화순","나주","담양","목포"];
  return (
        <div>
          <Banner/>
          <GalleryMap/>
          <GalleryList list={list}/>
        </div>
  )
}

export default Gallery