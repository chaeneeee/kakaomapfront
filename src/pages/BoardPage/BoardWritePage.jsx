import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { 
    Container, 
    Title, 
    Form, 
    Input, 
    TextArea, 
    SubmitButton, 
    ImagePreview, 
    ImageUploadButton,
    ButtonContainer,
    SubmitButtonContainer
} from './BoardStyles';
import { useAuth } from '../../hooks/useAuth';

const BoardWritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { boardType } = useParams();
  const { isLoggedIn, getToken } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!image) return null;

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getToken()}`
        }
      });
      return response.data; // Assuming the response contains the image URL
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const contentImg = await handleImageUpload();
  
    const data = {
      title,
      content,
      contentImg,
      boardType: boardType.toUpperCase()
    };
  
    console.log('Payload data:', JSON.stringify(data));
  
    try {
      const response = await axios.post(`http://localhost:8080/boards/${boardType}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      });
      console.log('Response:', response);

      const boardId = response.headers.location.split('/').pop();
      
      navigate(`/boards/${boardType}?newPost=true&postId=${boardId}`);
    } catch (error) {
      console.error('게시글 작성에 실패했습니다:', error);
      if (error.response) {
        console.log('서버 응답 데이터:', error.response.data);
        console.log('서버 응답 상태:', error.response.status);
        console.log('서버 응답 헤더:', error.response.headers);
        alert(`게시글 작성에 실패했습니다. 오류: ${error.response.data.error || '알 수 없는 오류'}`);
      } else if (error.request) {
        console.log('요청이 전송되었지만 응답을 받지 못했습니다:', error.request);
        alert('서버에서 응답이 없습니다. 네트워크 연결을 확인해주세요.');
      } else {
        console.log('오류 발생:', error.message);
        alert('게시글 작성 중 오류가 발생했습니다.');
      }
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Container>
      <Title>{getBoardTitle(boardType)}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <ButtonContainer>
          <ImageUploadButton type="button" onClick={handleImageUploadClick}>
            이미지 업로드
          </ImageUploadButton>
        </ButtonContainer>
        {imagePreview && (
          <ImagePreview>
            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          </ImagePreview>
        )}
        <SubmitButtonContainer>
          <SubmitButton type="submit">작성완료</SubmitButton>
        </SubmitButtonContainer>
      </Form>
    </Container>
  );
};

const getBoardTitle = (boardType) => {
  switch(boardType) {
    case 'review': return '매칭 후기 작성';
    case 'boast': return '자랑하기';
    case 'announcement': return '공지사항 작성';
    case 'inquiry': return '신고/문의 작성';
    default: return '게시글 작성';
  }
};

export default BoardWritePage;