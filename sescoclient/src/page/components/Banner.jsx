import React from 'react'
import main2Img from '../../img/main2Img.png'

const Banner = () => {
  return (
    <div className='Mbanner' style={{
        backgroundImage: `url("${main2Img}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
        <div className='Mbanner_info'>
          <h1>소소한 육아 TIP </h1>
          <br/><br/>
          <h2>0세~3세까지 : 뇌의 골격이 형성되는 시기</h2>
          <br/>
          <h4>▷  다양한 감각을 자극할 수 있는 놀이를 해주세요</h4>
          <br/>
          <p>모든 뇌가 골고루 자극을 받고 만들어지기 위해서는 아이에게 촉각, 시각, 청각, 후각,미각 오감각을 자극해주는 놀이가 좋습니다. <br/>한번의 자극으로 형성된 시냅스는 곧 사라져 없어시지 때문에 꾸준하고 지속적인 것이 좋습니다.</p>
        </div>
        
      </div>
  )
}

export default Banner