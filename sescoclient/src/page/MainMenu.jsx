import React, { useState } from 'react';
import './MainMenu.css'
import { Link } from 'react-scroll';
import bookIcon from '../img/main1/main1_bookIcon.png'
import tipIcon from '../img/main1/main1_TipIcon.png'
import galleryIcon from '../img/main1/main1_galleryIcon.png'
import { FiMenu } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


const MainMenu = ({setLoginClick}) => {

    const [isActivated, setIsActivated] = useState(false);
    // 미니 아이콘 클릭 체크 
    const [bookIconClick, setBookIconClick] = useState(false);
    const [galleryIconClick, setGalleryIconClick] = useState(false);
    const [tipIconClick, setTipIconClick] = useState(false);


    const handleLoginClick=()=>{
        window.scrollTo({top:0, left:0, behavior:'auto'});
        setLoginClick(true)
    }
    const handleMiniIconsClicked = (item) => {
        switch (item) {
            case 'book':
                setBookIconClick(true);
                setGalleryIconClick(false);
                setTipIconClick(false);
                break;
            case 'gallery':
                setGalleryIconClick(true);
                setBookIconClick(false);
                setTipIconClick(false);
                break;
            case 'tip':
                setTipIconClick(true);
                setGalleryIconClick(false);
                setBookIconClick(false);
                break;
        }
    }

    const handleFloatingClick = () => {
        setIsActivated(!isActivated);
    };

    return (
        <div>
            <div className='floating-menu' role="menu">
                <button id="floating" aria-controls="floating-items" className={`floationbtn is-floating is-primary ${isActivated ? 'is-activate' : ''}`} onClick={() => handleFloatingClick()}><span><FiMenu/></span></button>
                
                <a  id='loginMenu' className="is-floating" onClick={(event)=>handleLoginClick(event)}><FiUser className='icon'/><span>로그인</span></a>
                <Link to="tipDetail" className='is-floating' spy={true} smooth={false} onClick={() => handleMiniIconsClicked('tip')}>
                    <div className={"diaryIcon_box " + (tipIconClick && "tip_tip")}>
                        <img src={tipIcon} style={{ width: '50px' }} />
                    </div>
                </Link>
                <Link to="galleryDetail" className='is-floating' spy={true} smooth={false} onClick={() => handleMiniIconsClicked('gallery')}>
                    <div className={"diaryIcon_box " + (galleryIconClick && "gallery_gallery")}>
                        <img src={galleryIcon} style={{ width: '45px' }} />
                    </div>
                </Link>
                <Link to="diaryDetail" className='is-floating' spy={true} smooth={false} onClick={() => handleMiniIconsClicked('book')}>
                    <div className={"diaryIcon_box " + (bookIconClick && "book_book")}>
                        <img src={bookIcon} style={{ width: '50px' }} />
                    </div>
                </Link>
                
                

            
                
            </div>
        </div>
    );
};

export default MainMenu;