import React from 'react'
import gimg from '../../../img/cimg.png'
import '../gallery.css';

const Gallery = () => {
  return (
        <div className='banner' style={{
          backgroundImage: `url("${gimg}")`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
          <div className='banner_info'>
            <h2>"00"님의<br/> 이곳저곳</h2>
          </div>
        </div>
  )
}

export default Gallery