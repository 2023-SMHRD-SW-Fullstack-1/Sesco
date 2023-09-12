import React from 'react'
import styled from "styled-components";
import logo from "../img/babyslogo.png";

const Footer = () => {
  return (
    <FooterContainer>
            <FooterContent>
                <FooterLinkContainer>
                <FooterImage src={logo} alt="이미지" />
                    <FooterLinkTitle>Baby's 엄마들을 위한 수첩</FooterLinkTitle>
                    <FooterLinkContent>
                        <FooterLink href="/">
                            박정현
                        </FooterLink>
                        <FooterLink href="/">
                            김소희
                        </FooterLink>
                        <FooterLink href="/">
                            이선아
                        </FooterLink>
                        <FooterLink href="/">
                            천현민 
                        </FooterLink>
                        <FooterLink href="/">
                            홍재성
                        </FooterLink>
                    </FooterLinkContent>
                    <FooterDescContainer>
                        <FooterDescRights>
                            2023년 Full Stack SW융합 실무부트캠프
                        </FooterDescRights>
                    </FooterDescContainer>
                </FooterLinkContainer>
            </FooterContent>
        </FooterContainer>
    );
}

const FooterContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 30px 0;
border-top: 1px solid rgb(	255, 253, 236);;
width: 100%;
background-color : rgb(	255, 253, 236);
position: relative;
z-index: 100;

@media (max-width: 769px) {
padding: 20px 20px;
padding-bottom: 30px;
}
`;

const FooterContent = styled.div``;

const FooterLinkContainer = styled.div`
width: 700px;
diplay:flex;
justify-content: center;

@media (max-width: 768px) {
width: 100%;
}
`;
const FooterImage = styled.img`
width: 80px;
margin-left: 300px;
margin-bottom: 20px;



`;
const FooterLinkTitle = styled.h1`
color: gray;
display: flex;
justify-content: center;
font-size: 12px;

`;

const FooterLinkContent = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
margin-top: 35px;
margin-left:70px;
margin-bottom:20px;



@media (max-width: 768px) {
margin-top: 26px;
}
`;

const FooterLink = styled.a`
color: gray;
font-size: 14px;
width: 110px;
margin-bottom: 21px;
text-decoration: none;

&:hover {
text-decoration: underline;
}

@media (max-width: 768px) {
margin-bottom: 16px;
}
`;

const FooterDescContainer = styled.div`
margin-top: 30px

@media (max-width: 768px) {
rgin-top: 20px;
}
`;

const FooterDescRights = styled.h2`
color: gray;
font-size: 14px;
text-align: center;
`;

export default Footer