import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import banner from '../../assets/banner.jpg';
import KakaoMap from '../../components/Kakao';
import { useAuth } from '../../hooks/useAuth'; // useAuth 훅을 import

const safelyParseJSON = (jsonString) => {
  try {
    return jsonString ? JSON.parse(jsonString) : null;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return null;
  }
};

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [pet, setPet] = useState(null);
  const { isLoggedIn, logout } = useAuth(); // useAuth 훅 사용

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const petStr = localStorage.getItem('pet');
    setUser(safelyParseJSON(userStr));
    setPet(safelyParseJSON(petStr));
  }, []);

  return (
    <div>
      <BannerImage src={banner} alt="Home Banner" />
      <KakaoMap />

    </div>
  );
};

const BannerImage = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: cover;
  margin-top: 100px;
`;

const UserInfoContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
`;

const PetInfo = styled.div`
  margin-top: 20px;
`;

const PetImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin: 10px 0;
`;

const LogoutButton = styled.button`
  background-color: #e57373;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const LoginLink = styled(Link)`
  display: inline-block;
  margin: 20px 0;
  padding: 10px 15px;
  background-color: #e57373;
  color: white;
  text-decoration: none;
  border-radius: 5px;
`;

export default HomePage;