import React from 'react'
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

const CityGallery = () => {

  return (
    <Gallery>
    <Item
      original="1.jpg"
      thumbnail="thumb-1.jpg"
      width="1024"
      height="768"
    >
      {({ ref, open }) => (
        <img ref={ref} onClick={open} src="logo192.png" />
      )}
    </Item>
    <Item
      original="2.jpg"
      thumbnail="thumb-2.jpg"
      width="1024"
      height="768"
    >
      {({ ref, open }) => (
        <img ref={ref} onClick={open} src="logo512.png" />
      )}
    </Item>
  </Gallery>
  )
}

export default CityGallery