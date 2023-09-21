import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import Main2Avatar from './components/Main2Avatar';
import './Main.css';
import AvatarAddFrom from './components/AvatarAddFrom';
import axios from 'axios';

const Main2 = () => {
  const [babyAdd, setBabyAdd] = useState(false);
  const [babyList,setBabyList] = useState([]);
  const age = new Date();
  const month = age.getMonth()+1;
  const year = age.getFullYear();
  const day = year+'0'+ month

  
  const user_id = sessionStorage.getItem('user_id');
  babyList.forEach( (item, index) => console.log(index,item.kid_birth))
  
  const BabyAddClicked=()=>{
    if(babyAdd){
      setBabyAdd(false)
    }else{
      setBabyAdd(true)
    }
  }

  console.log("아이 불러오기 성공 babyList: ", babyList)
  console.log("day: ", Number(day))

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
      {babyList.map((baby,index)=><Main2Avatar key={index} baby={baby}/>)}
        
        {babyAdd &&
          <AvatarAddFrom  />
        }
          
          <div className='avatarAdd'>
            <button onClick={()=>BabyAddClicked()}>{babyAdd?"취소":"아이 추가"}</button>
          </div>


      </div>

    </div>
  )
}

export default Main2