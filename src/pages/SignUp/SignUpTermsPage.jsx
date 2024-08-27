import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SignUpTermsPage = () => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (agreeTerms && agreePrivacy) {
      navigate('/sign-up/members');
    } else {
      alert("모든 약관에 동의해주세요.");
    }
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Title>회원가입</Title>
        <SubTitle>아래 약관을 읽고 동의해 주세요.</SubTitle>
        
        <TermsSection>
          <TermsTitle>이용약관 동의</TermsTitle>
          <TermsContent>
          ● 제1조 [목적]
          이 이용약관은 함께걷개가 제공하는 반려동물 커뮤니티 및 산책 메이트 매칭 서비스(이하 “서비스”) 이용과 관련하여 복지관과 회원의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

          ● 제2조 [약관의 효력과 변경]
          1. 본 약관은 서비스를 통하여 이를 공지하거나 전자우편, 기타의 방법으로 회원에게 통지함으로써 효력이 발생됩니다.
          2. 함꼐걷개는 사정상 중요한 사유가 발생 될 경우 사전 고지 없이 이 약관의 내용을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지 또는 통지함으로써 효력이 발생됩니다.
          3. 회원은 변경된 약관에 동의하지 않을 경우 회원 탈퇴를 요청할 수 있으며, 변경된 약관의 효력 발생일 이후에도 서비스를 계속 사용할 경우 약관의 변경 사항에 동의한 것으로 간주됩니다.

          ● 제3조 [약관 외 준칙]
          1. 이 약관은 당사가 제공하는 서비스에 관한 이용규정 및 별도 약관과 함께 적용됩니다.
          2. 이 약관에 명시되지 않은 사항이 관계 법령에 규정되어 있을 경우에는 그 규정에 따릅니다.
          </TermsContent>
          <Form.Check 
            type="checkbox" 
            label="이용약관에 동의합니다." 
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
        </TermsSection>

        <TermsSection>
          <TermsTitle>개인정보 수집 및 이용 동의</TermsTitle>
          <TermsContent>
          ‘함께걷개’는  고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.
          함께걷개는 개인정보취급방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.

          함께걷개는 개인정보취급방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.

          본 방침은 : 2024년 08월 12 일부터 시행됩니다.
                    
          ● 수집하는 개인정보 항목
          복지관은 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
          ◦ 수집항목 : 이름, 성별, 로그인 ID, 비밀번호, 자택 전화번호, 자택 주소, 휴대전화번호, 이메일, 생년월일, 서비스 이용기록, 접속 로그, 접속 IP 정보, sms수신여부
          ◦ 개인정보 수집 방법 : 홈페이지(회원가입)
          </TermsContent>
          <Form.Check 
            type="checkbox" 
            label="개인정보 수집 및 이용에 동의합니다." 
            checked={agreePrivacy}
            onChange={(e) => setAgreePrivacy(e.target.checked)}
          />
        </TermsSection>

        <ButtonGroup>
          <CancelButton type="button" onClick={handleCancel}>
            취소
          </CancelButton>
          <ConfirmButton type="submit">
            확인
          </ConfirmButton>
        </ButtonGroup>
      </StyledForm>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  max-width: 600px;
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
  margin-bottom: 20px;
`;

const SubTitle = styled.p`
  text-align: center;
  margin-bottom: 30px;
  color: #757575;
`;

const TermsSection = styled.div`
  margin-bottom: 30px;
`;

const TermsTitle = styled.h5`
  color: #4a4a4a;
  margin-bottom: 10px;
`;

const TermsContent = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  height: 150px;
  overflow-y: auto;
  margin-bottom: 10px;
  font-size: 0.9em;
  color: #4a4a4a;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const BaseButton = styled(Button)`
  width: 48%;
`;

const CancelButton = styled(BaseButton)`
  background-color: white;
  color: #e57373;
  border: 1px solid #e57373;
  &:hover {
    background-color: #f8f8f8;
    color: #ef5350;
    border-color: #ef5350;
  }
`;

const ConfirmButton = styled(BaseButton)`
  background-color: #e57373;
  border-color: #e57373;
  &:hover {
    background-color: #ef5350;
    border-color: #ef5350;
  }
`;

export default SignUpTermsPage;