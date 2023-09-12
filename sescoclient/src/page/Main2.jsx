import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import Main2Avatar from './components/Main2Avatar';
import './Main.css';
import AvatarAddFrom from './components/AvatarAddFrom';
import axios from 'axios';

const Main2 = () => {
  const [babyAdd, setBabyAdd] = useState(false);
  const [babyList,setBabyList] = useState([]);
  const user_id = sessionStorage.getItem('user_id');

  const BabyAddClicked=()=>{
    if(babyAdd){
      setBabyAdd(false)
    }else{
      setBabyAdd(true)
    }
  }

  console.log("아이 불러오기 성공 babyList: ", babyList)

  useEffect(() => {
    
    const getKids = async () => {
      try {
        const response = await axios.post('http://localhost:8081/sesco/kid/getkidlist', { user_id: user_id })
        setBabyList(response.data)
        console.log("아이 불러오기 성공 response: ", response.data)
        
      } catch (e) {
        console.error("아이 정보 불러오기 실패", e)
      }
    }
    getKids();
    
  }, [])



  return (
    <div>
      <Banner />

      <div className='main2-avatarcontainer'>
        <Main2Avatar babyList={babyList}/>
        {babyAdd &&
          <AvatarAddFrom  />
        }
          
          <div className='avatarAdd'>
            <button onClick={()=>BabyAddClicked()}>아이 추가</button>
          </div>


      </div>

    </div>
  )
}

export default Main2