import React, { useState } from 'react';
import './MainMenu.css'
import { Link } from 'react-scroll';
import bookIcon from '../img/main1/main1_bookIcon.png'
import tipIcon from '../img/main1/main1_TipIcon.png'
import galleryIcon from '../img/main1/main1_galleryIcon.png'

const MainMenu = () => {
    const [isActivated, setIsActivated] = useState(false);
    // 미니 아이콘 클릭 체크 
    const [bookIconClick, setBookIconClick] = useState(false);
    const [galleryIconClick, setGalleryIconClick] = useState(false);
    const [tipIconClick, setTipIconClick] = useState(false);

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
                <button id="floating" aria-controls="floating-items" className={`btn is-floating is-primary ${isActivated ? 'is-activate' : ''}`} onClick={() => handleFloatingClick()}><span>+</span></button>
                
                <a href="#" className="is-floating">로그인</a>
                <Link to="tipDetail" className='is-floating' spy={true} smooth={false} onClick={() => handleMiniIconsClicked('tip')}>
                    <div className={"diaryIcon_box " + (tipIconClick && "book_tip")}>
                        <img src={tipIcon} style={{ width: '50px' }} />
                    </div>
                </Link>
                <Link to="galleryDetail" className='is-floating' spy={true} smooth={false} onClick={() => handleMiniIconsClicked('gallery')}>
                    <div className={"diaryIcon_box " + (galleryIconClick && "book_gallery")}>
                        <img src={galleryIcon} style={{ width: '50px' }} />
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