import React from 'react'
import tImg from '../../../img/tImg.png'


const Banner = ({user_nick}) => {

  return (
        <div className='Tbanner' style={{
          backgroundImage: `url("${tImg}")`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
          <div className='Tbanner_info'>
            <h2>"{user_nick}"님을 위한  육아TIP</h2>
          </div>
        </div>
  )
}

export default Banner