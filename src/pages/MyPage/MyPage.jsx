import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Container, Card } from 'react-bootstrap';

const fetchUserData = () => {
  const userStr = localStorage.getItem('user');
  console.log('Fetched User Data from localStorage:', userStr);
  return userStr ? JSON.parse(userStr) : null;
};

const MyPage = () => {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserData,
    staleTime: Infinity,
  });

  if (isLoading) return <StyledLoading>Loading...</StyledLoading>;
  if (isError || !user || !user.data) return <StyledError>Error loading data</StyledError>;

  console.log('User Data:', user);

  const { name, phone, email, nickName, gender, pets } = user.data;

  return (
    <StyledContainer>
      <Title>마이 페이지</Title>
      
      <StyledCard>
        <SubTitle>회원 정보</SubTitle>
        <InfoGroup>
          <InfoItem><strong>이름:</strong> {name}</InfoItem>
          <InfoItem><strong>전화번호:</strong> {phone}</InfoItem>
          <InfoItem><strong>이메일:</strong> {email}</InfoItem>
          <InfoItem><strong>닉네임:</strong> {nickName}</InfoItem>
          <InfoItem><strong>성별:</strong> {gender}</InfoItem>
        </InfoGroup>
      </StyledCard>

      <StyledCard>
        <SubTitle>내 펫 정보</SubTitle>
        {pets && pets.length > 0 ? (
          pets.map((pet, index) => (
            <PetCard key={index}>
              <PetImageWrapper>
                <PetImage src={pet.petProfileImage} alt={pet.petName} />
              </PetImageWrapper>
              <PetInfo>
                <PetName>{pet.petName}</PetName>
                <PetDetail><strong>종류:</strong> {pet.petBreed}</PetDetail>
                <PetDetail><strong>성격:</strong> {pet.petPersonality}</PetDetail>
                <PetDetail><strong>생일:</strong> {pet.petBirth}</PetDetail>
              </PetInfo>
            </PetCard>
          ))
        ) : (
          <NoPetInfo>등록된 펫 정보가 없습니다.</NoPetInfo>
        )}
      </StyledCard>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  max-width: 800px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const StyledCard = styled(Card)`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  margin-bottom: 30px;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
`;

const SubTitle = styled.h4`
  color: #666;
  margin-bottom: 20px;
  font-weight: bold;
`;

const InfoGroup = styled.div`
  margin-bottom: 20px;
`;

const InfoItem = styled.p`
  margin-bottom: 10px;
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
`;

const PetCard = styled.div`
  display: flex;
  align-items: center;
  background: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
`;

const PetImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  margin-right: 20px;
  border-radius: 50%;
  overflow: hidden;
`;

const PetImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PetInfo = styled.div`
  flex: 1;
`;

const PetName = styled.h3`
  margin: 0 0 10px 0;
  color: #e57373;
  font-size: 1.25rem;
  font-weight: bold;
`;

const PetDetail = styled.p`
  margin: 5px 0;
  color: #555;
  font-size: 0.9rem;
`;

const StyledLoading = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 1.2rem;
  color: #666;
`;

const StyledError = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 1.2rem;
  color: #e57373;
`;

const NoPetInfo = styled.div`
  text-align: center;
  font-size: 1rem;
  color: #777;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
`;

export default MyPage;