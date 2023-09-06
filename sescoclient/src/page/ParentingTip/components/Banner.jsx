import React from 'react'
import gimg from '../../../img/cimg.png'


const Banner = () => {
  return (
        <div className='banner' style={{
          backgroundImage: `url("${gimg}")`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
          <div className='banner_info'>
            <h2>"00"님을 위한<br/><br/> 육아TIP</h2>
          </div>
        </div>
  )
}

export default Banner