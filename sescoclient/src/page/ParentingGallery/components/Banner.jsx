import React from 'react'
import gimg from '../../../img/cimg.png'
import '../galleryroot.css';

const Gallery = ({user_nick}) => {
  return (
        <div className='banner' style={{
          backgroundImage: `url("${gimg}")`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
          <div className='banner_info'>
            <h2>"{user_nick}"님의<br/> 이곳저곳</h2>
          </div>
        </div>
  )
}

export default Gallery