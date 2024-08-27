import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';
import { Container } from 'react-bootstrap';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// 사용자 정보를 로컬 스토리지에서 가져오는 함수
const fetchUser = async () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

const AppLayout = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: Infinity,
  });

  // 콘솔에 데이터 출력
  console.log("User data:", user);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/auth/logout');
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
    } finally {
      // 로컬 스토리지에서 사용자와 펫 정보 삭제
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('pets');
      
      // React Query 캐시 업데이트
      queryClient.setQueryData(['user'], null);
      queryClient.setQueryData(['pets'], null);
      
      // 로그인 페이지로 리다이렉트
      navigate('/login');
    }
  };

  // 펫 프로필 이미지를 가져오기
  const petImage = user?.data?.pets?.[0]?.petProfileImage;
  // user 닉네임 가져오기
  const nickName = user?.data?.nickName;

  const handleDropdownToggle = () => {
    setDropdownOpen(prev => !prev); // 드롭다운 열림/닫힘 토글
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <PageWrapper>
      <StyledNavbar>
        <NavbarContainer>
          <Link to="/">
            <Logo src={logo} alt="Logo" />
          </Link>
          <NavLinks>
            <StyledNavLink to="/boards/review">매칭 후기</StyledNavLink>
            <StyledNavLink to="/boards/boast">자랑</StyledNavLink>
            <StyledNavLink to="/boards/announcement">공지사항</StyledNavLink>
            <StyledNavLink to="/boards/inquiry">신고/문의</StyledNavLink>
          </NavLinks>
          {user ? (
            <UserActions>
              {petImage ? (
                <UserProfileImage src={petImage} alt="Pet Profile" />
              ) : (
                <UserProfileImageFallback>프로필 이미지 없음</UserProfileImageFallback>
              )}
              <UserName onClick={handleDropdownToggle}>
                {nickName} 님
              </UserName>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
              {dropdownOpen && (
                <DropdownMenu ref={dropdownRef} isOpen={dropdownOpen}>
                  <DropdownItem to="/mypage" onClick={() => setDropdownOpen(false)}>마이페이지</DropdownItem>
                  <DropdownItem to="/friends" onClick={() => setDropdownOpen(false)}>친구</DropdownItem>
                  <DropdownItem to="/blacklist" onClick={() => setDropdownOpen(false)}>블랙리스트</DropdownItem>
                  <DropdownItem to="/my-posts" onClick={() => setDropdownOpen(false)}>내 게시글</DropdownItem>
                </DropdownMenu>
              )}
            </UserActions>
          ) : (
            <LoginButton to="/login">로그인</LoginButton>
          )}
        </NavbarContainer>
      </StyledNavbar>
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledNavbar = styled.nav`
  background-color: white;
  padding: 10px 0;
`;

const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; // 드롭다운 위치를 조절하기 위해 상대 위치 설정
`;

const Logo = styled.img`
  height: 50px;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

const StyledNavLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  margin: 0 30px;
  font-weight: bold;
`;

const LoginButton = styled(NavLink)`
  background-color: #79c283dd;
  border-color: #79c283dd;
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &.active {
    background-color: #79c283dd;
    border-color: #79c283dd;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 40px 0;
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const UserProfileImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserProfileImageFallback = styled.span`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  color: #333;
`;

const UserName = styled.span`
  margin-right: 10px;
  cursor: pointer;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;  // UserName 바로 아래에 위치하도록 조정
  left: 0;    // 왼쪽 정렬
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: opacity 0.4s ease, visibility 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1000;

  ${({ isOpen }) => isOpen && `
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  `}

  animation: ${({ isOpen }) => isOpen ? 'fadeInDown 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none'};

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DropdownItem = styled(NavLink)`
  display: block;
  padding: 0.5rem 1rem;
  color: black;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }

  &.active {
    background-color: #e9ecef;
  }
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

export default AppLayout;
