import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';
import cuteDog1 from '../../assets/dancing_dog1.png';
import cuteDog2 from '../../assets/dancing_dog2.png'; // 두 번째 강아지 이미지

const NotFoundPage = () => {
  return (
    <StyledContainer>
      <PageWrapper>
        <DogImage src={cuteDog1} alt="Cute dog 1" />
        <Content>
          <Title>404</Title>
          <Subtitle>페이지를 찾을 수 없습니다</Subtitle>
          <Description>
            이런! 강아지들이 페이지를 숨겼나 봐요.<br/>
            URL을 확인하시거나 아래 버튼을 눌러 홈페이지로 돌아가세요.
          </Description>
          <StyledLink to="/">
            <HomeButton variant="primary">홈으로 돌아가기</HomeButton>
          </StyledLink>
        </Content>
        <DogImage src={cuteDog2} alt="Cute dog 2" />
      </PageWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
`;

const DogImage = styled.img`
  width: 200px;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const Title = styled.h1`
  font-size: 6rem;
  color: #e57373;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const HomeButton = styled(Button)`
  background-color: #e57373;
  border-color: #e57373;
  &:hover {
    background-color: #ef5350;
    border-color: #ef5350;
  }
`;

export default NotFoundPage;