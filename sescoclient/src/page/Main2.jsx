import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import Main2Avatar from './components/Main2Avatar';
import './Main.css';
import AvatarAddFrom from './components/AvatarAddFrom';
import axios from 'axios';
import main2babyAddImg from '../img/main2/main2babyAddImg.png'
import main2babyAdd from '../img/main2/main2babyAdd.png'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner2 from './components/Banner2';

const Main2 = () => {
  const [babyAdd, setBabyAdd] = useState(false);
  const [babyList,setBabyList] = useState([]);
  const [babyAddCheck, setBabyAddCheck] = useState(true);
  const age = new Date();
  const month = age.getMonth()+1;
  const year = age.getFullYear();
  const day = year+'0'+ month

  
  const user_id = sessionStorage.getItem('user_id');
  babyList.forEach( (item, index) => console.log(index,item.kid_birth))
  
  const BabyAddClicked=()=>{
    if(babyList.length<=0 && babyAddCheck){
      setBabyAddCheck(false)
    }else if(babyList.length<=0 && !babyAddCheck){
      setBabyAddCheck(true)

    }
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
        const response = await axios.post('http://172.30.1.56:8081/sesco/kid/getkidlist', { user_id: user_id })
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
      {/* <Banner /> */}
      <Banner2/>
      <div className='main2-avatarcontainer'>
          <div className='babyAdd'>
            <img className='main2babyAddImg' width={'85px'} src={main2babyAddImg}/>
            <Button variant="warning" className='addBabyInfoBtn' onClick={()=>BabyAddClicked()}>{babyAdd?"등록 취소":"아이 등록하기"}</Button>
          </div>
          {babyList.length<=0 && babyAddCheck?
            <div className='main2babyAddContainer'>
              <img className='main2babyAdd' width={'900px'}height={'630px'}src={main2babyAdd}/>
              <br/>
              <button className='main2babyAdd_txt' onClick={()=>BabyAddClicked()}>등록된 아이가 없어요 ! <br/>아이를 등록해주세요.</button>
              
            </div>
            :
            ""
            }
        {babyAdd &&
          <AvatarAddFrom  />
        }

      {babyList.map((baby,index)=><Main2Avatar key={index} baby={baby}/>)}
        
          


      </div>

    </div>
  )
}

export default Main2