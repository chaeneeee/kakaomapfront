import React, { useState, useRef } from 'react';
import { Container, Form, Button, Image, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      // Member 정보
      name: '',
      gender: '',
      email: '',
      password: '',
      confirmPassword: '',
      nickName: '',
      phone: '',
      birth: '',
      mainAddress: '',
      detailAddress: '',
      // Pet information
      petName: '',
      petPersonality: '',
      petBreed: '',
      petBirth: '',
      petNeutered: '',
      petGender: '',
      petSize: '',
      petProfileImage: null

    });

    const [errors, setErrors] = useState({});
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [profilePreview, setProfilePreview] = useState(null);
    const fileInputRef = useRef(null);
    const [emailVerified, setEmailVerified] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [showVerificationInput, setShowVerificationInput] = useState(false);

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
          case 'name':
            if (!value.trim()) {
              error = '이름은 공백이 아니어야 합니다.';
            }
            break;
          case 'gender':
            if (value !== 'M' && value !== 'F') {
              error = "성별을 'M' 과 'F'로 입력해 주세요.";
            }
            break;
          case 'email':
            if (!/\S+@\S+\.\S+/.test(value)) {
              error = '유효한 이메일 주소를 입력해주세요.';
            }
            break;
          case 'password':
            if (value.length < 8 || value.length > 20) {
              error = '비밀번호는 8자에서 20자 사이여야 합니다.';
            } else if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\\|,.<>/?`~]+$/.test(value)) {
              error = '비밀번호는 알파벳, 숫자, 특수문자만 포함할 수 있습니다.';
            }
            break;
          case 'confirmPassword':
            if (value !== formData.password) {
              error = '비밀번호가 일치하지 않습니다.';
            }
            break;
          case 'nickName':
            if (!/^[a-zA-Z가-힣]+$/.test(value)) {
              error = '숫자와 특수문자는 사용할 수 없습니다. 알파벳과 한글만 입력해 주세요.';
            }
            break;
          case 'phone':
            if (!/^010-\d{3,4}-\d{4}$/.test(value)) {
                error = '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)';
            }
            break;
          case 'birth':
            if (!/^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/.test(value)) {
              error = '생년월일 YYYYMMDD 형식으로 입력해 주세요.';
            }
            break;
          case 'petName':
            if (!value) {
              error = '반려견의 이름을 입력해주세요.';
            }
            break;
          case 'petPersonality':
            if (!value) {
              error = '반려견의 성격을 간단히 작성해주세요.';
            } else if (value.length > 20) {
              error = '반려견의 성격은 최대 20자까지 작성할 수 있습니다.';
            }
            break;
          case 'petBreed':
            if (!value) {
              error = '반려견의 품종을 입력해주세요.';
            }
            break;
          case 'petBirth':
            if (!value) {
              error = '반려견의 출생일을 입력해주세요.';
            }
            break;
          case 'petNeutered':
            if (value !== 'Y' && value !== 'N') {
              error = "중성화 여부를 'Y' 과 'N'로 입력해 주세요.";
            }
            break;
          case 'petGender':
            if (value !== 'M' && value !== 'F') {
              error = "성별을 'M' 과 'F'로 입력해 주세요.";
            }
            break;
          case 'petSize':
            if (value !== 'S' && value !== 'M' && value !== 'L') {
              error = "반려견의 크기를 'S', 'M' ,'L' 으로 입력해 주세요.";
            }
            break;
          default:
            break;
        }
        return error;
      };

      const handleSendVerificationCode = async () => {
        try {
          await axios.post('http://localhost:8080/auth-code', { email: formData.email });
          setShowVerificationInput(true);
          alert('이메일로 인증 코드를 전송했습니다. 인증 코드를 입력하여 회원가입을 완료하세요.');
        } catch (error) {
          console.error('인증 코드 전송 실패:', error);
          alert('인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
        }
      };
  
      const handleVerifyCode = async () => {
        try {
          await axios.post('http://localhost:8080/verify-auth-code', { 
            email: formData.email, 
            authCode: verificationCode 
          });
          setEmailVerified(true);
          alert('이메일 인증이 완료되었습니다. 회원가입을 진행하세요.');
        } catch (error) {
          console.error('인증 코드 확인 실패:', error);
          alert('인증 코드가 올바르지 않습니다. 다시 시도해주세요.');
        }
      };

      const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
  
          try {
            const response = await axios.post('http://localhost:8080/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            setFormData(prevState => ({
              ...prevState,
              petProfileImage: response.data // Save the image URL
            }));
            setProfilePreview(URL.createObjectURL(file));
          } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다.');
          }
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;  // 기본값으로 원래 값을 사용
      
        if (name === 'phone') {
          // 숫자만 추출
          const numericValue = value.replace(/[^\d]/g, '');
          
          // 전화번호 형식에 맞게 변환
          if (numericValue.length <= 3) {
            formattedValue = numericValue;
          } else if (numericValue.length <= 7) {
            formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
          } else {
            formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7, 11)}`;
          }
        }
        
        setFormData(prevState => ({ ...prevState, [name]: formattedValue }));
        
        const error = validateField(name, formattedValue);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));

        // 비밀번호 확인 필드 추가 검증
      if (name === 'password' || name === 'confirmPassword') {
        const confirmError = validateField('confirmPassword', name === 'password' ? formData.confirmPassword : value);
        setErrors(prevErrors => ({ ...prevErrors, confirmPassword: confirmError }));
      }
      };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData(prevState => ({
          ...prevState,
          petProfileImage: file
        }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleAddressComplete = (data) => {
      setFormData(prevState => ({
        ...prevState,
        mainAddress: data.address
      }));
      setShowAddressModal(false);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!emailVerified) {
        alert('이메일 인증을 완료해주세요.');
        return;
      }

      const newErrors = {};
      Object.keys(formData).forEach(key => {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      });

      if (Object.keys(newErrors).length === 0) {
        try {
          const memberData = {
            name: formData.name,
            gender: formData.gender,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            nickName: formData.nickName,
            phone: formData.phone,
            birth: formData.birth,
            mainAddress: formData.mainAddress,
            detailAddress: formData.detailAddress,
            pets: [{
              petProfileImage: formData.petProfileImage,
              petName: formData.petName,
              petPersonality: formData.petPersonality,
              petBreed: formData.petBreed,
              petBirth: formData.petBirth,
              petNeutered: formData.petNeutered,
              petGender: formData.petGender,
              petSize: formData.petSize
            }]
          };

          await axios.post('http://localhost:8080/members', memberData, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          });
          
          navigate('/login', { state: { email: formData.email } });
        } catch (error) {
          console.error('회원가입 오류:', error);
          alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
      } else {
        setErrors(newErrors);
      }
    };

    const handleFileButtonClick = () => {
      fileInputRef.current.click();
    };

    return (
      <StyledContainer>
        <StyledForm onSubmit={handleSubmit}>
          <Title>회원가입</Title>

          {/* Member Information */}
          <SubTitle>견주 정보</SubTitle>
          <InputGroup>
            <StyledInput
              type="text"
              name="name"
              placeholder="이름"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              required
            />
            <ErrorMessage>{errors.name}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <StyledSelect
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              isInvalid={!!errors.gender}
              required
            >
              <option value="">성별 선택</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </StyledSelect>
            <ErrorMessage>{errors.gender}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <StyledInput
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              required
            />
            <ErrorMessage>{errors.email}</ErrorMessage>
            <Button onClick={handleSendVerificationCode} disabled={emailVerified}>
              인증 코드 전송
            </Button>
          </InputGroup>

          {showVerificationInput && (
            <InputGroup>
              <StyledInput
                type="text"
                placeholder="인증 코드"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                isInvalid={!!errors.verificationCode}
                required
              />
              <Button onClick={handleVerifyCode} disabled={emailVerified}>
                인증 확인
              </Button>
              <ErrorMessage>{errors.verificationCode}</ErrorMessage>
            </InputGroup>
          )}

          <InputGroup>
            <StyledInput
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              required
            />
            <ErrorMessage>{errors.password}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <StyledInput
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              required
            />
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <StyledInput
              type="text"
              name="nickName"
              placeholder="닉네임"
              value={formData.nickName}
              onChange={handleChange}
              isInvalid={!!errors.nickName}
              required
            />
            <ErrorMessage>{errors.nickName}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <StyledInput
              type="tel"
              name="phone"
              placeholder="전화번호 (예: 010-1234-5678)"
              value={formData.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
              required
            />
            <ErrorMessage>{errors.phone}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <StyledInput
              type="text"
              name="birth"
              placeholder="생년월일 (예: 19990101)"
              value={formData.birth}
              onChange={handleChange}
              isInvalid={!!errors.birth}
              required
            />
            <ErrorMessage>{errors.birth}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <StyledInput
              type="text"
              name="mainAddress"
              placeholder="주소"
              value={formData.mainAddress}
              readOnly
              isInvalid={!!errors.mainAddress}
              required
            />
            <AddressButton type="button" onClick={() => setShowAddressModal(true)}>
              주소 검색
            </AddressButton>
            <ErrorMessage>{errors.mainAddress}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <StyledInput
              type="text"
              name="detailAddress"
              placeholder="상세 주소"
              value={formData.detailAddress}
              onChange={handleChange}
            />
          </InputGroup>

          {/* Pet Information */}
          <SubTitle>반려견 정보</SubTitle>
          <InputGroup>
            <ProfileImageWrapper>
              {profilePreview ? (
                <ProfileImage src={profilePreview} alt="Pet Preview" />
              ) : (
                <DefaultProfileImage>반려견 이미지</DefaultProfileImage>
              )}
            </ProfileImageWrapper>
            <HiddenFileInput
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              ref={fileInputRef}
            />
            <FileUploadButton type="button" onClick={() => fileInputRef.current.click()}>
              {formData.petProfileImage ? '이미지 변경' : '이미지 선택'}
            </FileUploadButton>
          </InputGroup>

          <InputGroup>
            <StyledInput
              type="text"
              name="petName"
              placeholder="반려견 이름"
              value={formData.petName}
              onChange={handleChange}
              isInvalid={!!errors.petName}
              required
            />
            <ErrorMessage>{errors.petName}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <StyledInput
              type="text"
              name="petPersonality"
              placeholder="반려견 성격 (최대 20자)"
              value={formData.petPersonality}
              onChange={handleChange}
              isInvalid={!!errors.petPersonality}
              required
            />
            <ErrorMessage>{errors.petPersonality}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <StyledInput
              type="text"
              name="petBreed"
              placeholder="반려견 품종"
              value={formData.petBreed}
              onChange={handleChange}
              isInvalid={!!errors.petBreed}
              required
            />
            <ErrorMessage>{errors.petBreed}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <StyledInput
              type="text"
              name="petBirth"
              placeholder="반려견 출생일 (YYYYMMDD)"
              value={formData.petBirth}
              onChange={handleChange}
              isInvalid={!!errors.petBirth}
              required
            />
            <ErrorMessage>{errors.petBirth}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <StyledSelect
              name="petNeutered"
              value={formData.petNeutered}
              onChange={handleChange}
              isInvalid={!!errors.petNeutered}
              required
            >
              <option value="">중성화 여부</option>
              <option value="Y">Y</option>
              <option value="N">N</option>
            </StyledSelect>
            <ErrorMessage>{errors.petNeutered}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <StyledSelect
              name="petGender"
              value={formData.petGender}
              onChange={handleChange}
              isInvalid={!!errors.petGender}
              required
            >
              <option value="">반려견 성별</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </StyledSelect>
            <ErrorMessage>{errors.petGender}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <StyledSelect
              name="petSize"
              value={formData.petSize}
              onChange={handleChange}
              isInvalid={!!errors.petSize}
              required
            >
              <option value="">반려견 크기</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </StyledSelect>
            <ErrorMessage>{errors.petSize}</ErrorMessage>
          </InputGroup>

          <SubmitButton type="submit">회원가입</SubmitButton>
        </StyledForm>

        <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>주소 검색</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DaumPostcode onComplete={handleAddressComplete} />
          </Modal.Body>
        </Modal>
      </StyledContainer>
    );
};

const StyledContainer = styled(Container)`
  max-width: 500px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const StyledForm = styled(Form)`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const SubTitle = styled.h4`
  color: #666;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const StyledInput = styled(Form.Control)`
  margin-bottom: 5px;
`;

const StyledSelect = styled(Form.Select)`
  margin-bottom: 5px;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875em;
`;

const AddressButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
  background-color: #4a90e2;
  border-color: #4a90e2;
  &:hover {
    background-color: #357ae8;
    border-color: #357ae8;
  }
`;

const ProfileImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DefaultProfileImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileUploadButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  background-color: #4a90e2;
  border-color: #4a90e2;
  &:hover {
    background-color: #357ae8;
    border-color: #357ae8;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 30px;
  background-color: #e57373;
  border-color: #e57373;
  &:hover {
    background-color: #ef5350;
    border-color: #ef5350;
  }
`;

export default SignUpPage;