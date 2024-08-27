import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo_remove.png'
import { FaYoutube, FaComments } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterWrapper>
      <CurvedBackground />
      <ContentWrapper>
        <LogoSection>
          <Logo src={logo} alt="Logo" />
          <LogoText></LogoText>
        </LogoSection>
        <InfoSection>
          <ContactSection>
            <ContactItem>이용안내 02-1111-2222</ContactItem>
            <ContactItem>후원안내 02-3333-4444</ContactItem>
            <ContactItem>운영시간 09:00-18:00 (주말 및 공휴일 휴무)</ContactItem>
          </ContactSection>
          <AddressSection>
            <Address>주소: 서울특별시 테헤란로 7길 7(함께걷개)</Address>
            <Contact>전화: 02-1234-1234 팩스: 02-1234-1234</Contact>
          </AddressSection>
        </InfoSection>
        <CopyrightSection>
          <Copyright>Copyright © 2024 함께걷개 All rights reserved.</Copyright>
          <Designer>designed by Gwanghui</Designer>
        </CopyrightSection>
      </ContentWrapper>
      <IconsWrapper>
        <Icon><FaComments /></Icon>
        <Icon><FaYoutube /></Icon>
      </IconsWrapper>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  position: relative;
  background-color: #f0f8f0;
  padding: 40px 20px 20px;
  font-family: Arial, sans-serif;
`;

const CurvedBackground = styled.div`
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #f0f8f0;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  height: 50px;
  margin-right: 10px;
`;

const LogoText = styled.div`
  font-size: 18px;
  font-weight: bolder;
  color: #4a4a4a;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ContactSection = styled.div`
  flex: 1;
`;

const ContactItem = styled.div`
  color: #4a4a4a;
  margin-bottom: 5px;
`;

const AddressSection = styled.div`
  flex: 1;
`;

const Address = styled.div`
  color: #4a4a4a;
  margin-bottom: 5px;
`;

const Contact = styled.div`
  color: #4a4a4a;
`;

const CopyrightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: #4a4a4a;
`;

const Copyright = styled.div`
  font-size: 14px;
  text-align: center;
`;

const Designer = styled.div``;

const IconsWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
`;

const Icon = styled.div`
  font-size: 24px;
  color: #4a4a4a;
  margin-left: 10px;
  cursor: pointer;
`;

export default Footer;