import React, { useState } from 'react';
import Banner from './components/Banner';
import Main2Avatar from './components/Main2Avatar';
import './Main.css';
import AvatarAddFrom from './components/AvatarAddFrom';

const Main2 = () => {
  const [babyAdd, setBabyAdd] = useState(false);

  const BabyAddClicked=()=>{
    if(babyAdd){
      setBabyAdd(false)
    }else{
      setBabyAdd(true)
    }
  }

  return (
    <div>
      <Banner />

      <div className='main2-avatarcontainer'>
        <Main2Avatar/>
        {babyAdd &&
          <AvatarAddFrom />
        }
          
          <div className='avatarAdd'>
            <button onClick={()=>BabyAddClicked()}>아이 추가</button>
          </div>


      </div>

    </div>
  )
}

export default Main2