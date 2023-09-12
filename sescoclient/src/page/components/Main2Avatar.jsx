import React from 'react'
import '../Main.css';
import avatarBg from '../../img/avatarBg.png'
import babyAgeIcon from '../../img/babyAgeIcon.png'
import babyGenderIcon from '../../img/babyGenderIcon.png'
import babyKeyIcon from '../../img/babyKeyIcon.png'
import babyWeightIcon from '../../img/babyWeightIcon.png'
import diaryIcon from '../../img/diaryIcon.png'
import galleryIcon from '../../img/galleryIcon.png'
import tipIcon from '../../img/tipIcon.png'

const Main2Avatar = ({babyList}) => {

    // 아이 정보 담은 객체 
    const babys = [
        { age: '2023.01.01', gender: '남', key: '30', weight: '8' },
        { age: '2023.03.02', gender: '여', key: '27', weight: '6.5' }
    ]

    console.log(babys);
    return (
        <>

            {/*  아이 정보를 담은 객체만큼 map */}
            {babyList?.map((item, index) =>

                <div className='avatar' key={index}>
                    <div className='avatar-container'>
                        <img style={{ width: '550px', height: '450px', marginLeft: '10px', marginRight: '10px', borderRadius: '8px' }} src={avatarBg} />
                        <div className='avatar-contents'>
                            <div className='avatar-content'>
                                {/* 출생년도 */}
                                <div className='avatar-context'><img src={babyAgeIcon} /> 출생년도 <br /> {item?.kid_birth}</div>
                                {/* 성별 */}
                                <div className='avatar-context'><img src={babyGenderIcon} />성별 <br /> {item?.kid_gender=='M'?'남':'여'}아</div>
                            </div>

                            <div className='avatar-content'>
                                {/* 키 */}
                                <div className='avatar-context'><img src={babyKeyIcon} />키 <br /> {item?.kid_height} cm</div>
                                {/* 몸무게 */}
                                <div className='avatar-context'><img src={babyWeightIcon} />몸무게 <br /> {item?.kid_weight} kg</div>
                            </div>

                            <div className='avatar-content'>
                                <div className='avatarIcon-context'>
                                    {/* 메뉴 아이콘 */}
                                    <img width={'100px'} src={diaryIcon} />
                                    <img width={'100px'} src={galleryIcon} />
                                    <img width={'100px'} src={tipIcon} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default Main2Avatar