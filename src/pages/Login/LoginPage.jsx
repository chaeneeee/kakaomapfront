import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import kakao from '../../assets/kakao.png';
import google from '../../assets/google.png';
import '../../config/axiosConfig';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login, isLoggedIn, user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (isLoggedIn && user) {
      console.log('로그인 성공:', user);
    }
  }, [isLoggedIn, user]);

  const validateForm = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      newErrors.username = '유효한 이메일 주소를 입력해주세요.';
    }
    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login({ username, password });
      } catch (error) {
        console.error('로그인 오류:', error);
      }
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} 로그인 시도`);
  };

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (isLoggedIn && user) {
    return (
      <StyledContainer>
        <WelcomeContainer>
          {user.pet && user.pet.petProfileImage && (
            <PetImage src={user.pet.petProfileImage} alt="반려견 사진" />
          )}
          <WelcomeMessage>
            환영합니다, {user.nickName || '사용자'}님!
          </WelcomeMessage>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </WelcomeContainer>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Title>로그인</Title>
        <p style={{textAlign: 'center', marginBottom: '30px'}}>함께걷개 방문을 환영합니다!</p>
        <StyledInput 
          type="email" 
          placeholder="이메일" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          isInvalid={!!errors.username}
        />
        {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
        <StyledInput 
          type="password" 
          placeholder="비밀번호" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isInvalid={!!errors.password}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        <StyledButton type="submit">
          로그인
        </StyledButton>
        <LinkContainer>
          <StyledLink to="/members/find-id">아이디찾기</StyledLink>
          <StyledLink to="/members/find-pw">비밀번호찾기</StyledLink>
          <StyledLink to="/sign-up">회원가입</StyledLink>
        </LinkContainer>
        <SocialLoginContainer>
          <SocialLoginButton onClick={() => handleSocialLogin('google')}>
            <SocialIcon src={google} alt="Google" />
          </SocialLoginButton>
          <SocialLoginButton onClick={() => handleSocialLogin('kakao')}>
            <SocialIcon src={kakao} alt="Kakao" />
          </SocialLoginButton>
        </SocialLoginContainer>
      </StyledForm>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  max-width: 400px;
  margin-top: 50px;
`;

const StyledForm = styled(Form)`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  color: #e57373;
  text-align: center;
  margin-bottom: 30px;
`;

const StyledInput = styled(Form.Control)`
  margin-bottom: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8em;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #e57373;
  border-color: #e57373;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  
  &:hover, &:focus, &:active, &:active:focus {
    background-color: #ef5350;
    border-color: #ef5350;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  color: #757575;
  text-decoration: none;
  font-size: 0.9em;
  margin: 0 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SocialLoginButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 10px;
`;

const SocialIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const PetImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const WelcomeMessage = styled.p`
  font-size: 1.2em;
  color: #e57373;
  text-align: center;
  margin-bottom: 20px;
`;

const LogoutButton = styled(Button)`
  background-color: #e57373;
  border-color: #e57373;
  &:hover, &:focus {
    background-color: #ef5350;
    border-color: #ef5350;
  }
`;

export default LoginPage;