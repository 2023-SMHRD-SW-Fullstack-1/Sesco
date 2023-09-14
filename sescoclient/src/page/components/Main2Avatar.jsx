import React, { useState } from 'react'
import '../Main.css';
import avatarBg from '../../img/avatarBg.png'
import babyAgeIcon from '../../img/babyAgeIcon.png'
import babyGenderIcon from '../../img/babyGenderIcon.png'
import babyKeyIcon from '../../img/babyKeyIcon.png'
import babyWeightIcon from '../../img/babyWeightIcon.png'
import diaryIcon from '../../img/diaryIcon.png'
import galleryIcon from '../../img/galleryIcon.png'
import tipIcon from '../../img/tipIcon.png'
import man0 from '../../img/main2/남0_6.png'
import man1 from '../../img/main2/남6_12.png'
import man2 from '../../img/main2/남12_18.png'
import man3 from '../../img/main2/남18_24.png'
import man4 from '../../img/main2/남2_3.png'
import man5 from '../../img/main2/남3_4.png'
import man6 from '../../img/main2/남4_5.png'
import man7 from '../../img/main2/남5_.png'
import won0 from '../../img/main2/여0_6.png'
import won1 from '../../img/main2/여6_12.png'
import won2 from '../../img/main2/여12_18.png'
import won3 from '../../img/main2/여18_24.png'
import won4 from '../../img/main2/여2_3.png'
import won5 from '../../img/main2/여3_4.png'
import won6 from '../../img/main2/여4_5.png'
import won7 from '../../img/main2/여5_.png'
import { Link } from 'react-router-dom';


const Main2Avatar = ({baby}) => {
    

    const manBabyimgs =[man0,man1,man2,man3,man4,man5,man6,man7]
    const womBabyimgs =[won0,won1,won2,won3,won4,won5,won6,won7]

    // 아이 나이 계산
    const age = new Date();
    const month = age.getMonth()+1;
    const year = age.getFullYear();
    let imgNum = '';
    let babyAge = ((Number(year)-Number(baby.kid_birth.substring(0, 4)))*12)+((Number(month)-Number(baby.kid_birth.substring(5, 7))))

    if(babyAge>=0&&babyAge<=6){
        imgNum=0
    }else if(babyAge>6&&babyAge<=12){
        imgNum=1
    }else if(babyAge>12&&babyAge<=18){
        imgNum=2
    }else if(babyAge>18&&babyAge<=24){
        imgNum=3
    }else if(babyAge>24&&babyAge<=36){
        imgNum=4
    }else if(babyAge>36&&babyAge<=48){
        imgNum=5
    }else if(babyAge>48&&babyAge<=60){
        imgNum=6
    }else if(babyAge>60){
        imgNum=7
    }

    const moveToTip=()=>{
        sessionStorage.setItem("kid_seq", baby.kid_seq)
    }

    return (
        <>

            {/*  아이 정보를 담은 객체만큼 map */}

                <div className='avatar'>
                    <div className='avatar-container'>
                        {/* 아바타, 배경이미지  */}
                        <div className='babyImgContainer'>
                            <div className='babyImgContent'>
                                {baby?.kid_gender=='M'?<img id={"charImg"+imgNum} className='charImg' src={manBabyimgs[imgNum]}/>:<img id={"charImg"+imgNum} className='charImg' src={womBabyimgs[imgNum]}/>}   
                            </div>
                            <img className='bgImg'style={{ width: '550px', height: '450px', marginLeft: '10px', marginRight: '10px', borderRadius: '8px' }} src={avatarBg} />
                        </div>
                        {/* 아이정보 박스 */}
                        <div className='avatar-contents'>
                            {/* 아이 정보 */}
                            <div className='avatar-content'>
                                <div className='avatar-context'><img src={babyAgeIcon} /> 출생년도 개월수{babyAge}<br />{baby?.kid_birth}</div>
                                <div className='avatar-context'><img src={babyGenderIcon} />성별 <br /> {baby?.kid_gender=='M'?'남':'여'}아</div>
                            </div>
                            <div className='avatar-content'>
                                <div className='avatar-context'><img src={babyKeyIcon} />키 <br /> {baby?.kid_height} cm</div>
                                <div className='avatar-context'><img src={babyWeightIcon} />몸무게 <br /> {baby?.kid_weight} kg</div>
                            </div>
                            {/* 메뉴 아이콘 */}
                            <div className='avatar-content'>
                                <div className='avatarIcon-context'>
                                    <img width={'100px'} src={diaryIcon} />
                                    <img width={'100px'} src={galleryIcon} />
                                    <Link to="/tip" onClick={()=>moveToTip()}>
                                        <img width={'100px'} src={tipIcon} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


        </>
    )
}

export default Main2Avatar