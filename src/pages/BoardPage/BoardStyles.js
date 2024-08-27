import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const Th = styled.th`
  background-color: #f8f9fa;
  color: #495057;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
`;

export const WriteButton = styled(Button)`
  float: right;
  background-color: #007bff;
  border-color: #007bff;
  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  min-height: 200px;
`;

export const Meta = styled.div`
  margin-bottom: 20px;
  color: #6c757d;
  
  span {
    margin-right: 15px;
  }
`;

export const Content = styled.div`
  white-space: pre-wrap;
  margin-bottom: 30px;
`;

export const BackButton = styled(Button)`
  background-color: #6c757d;
  border-color: #6c757d;
  &:hover {
    background-color: #5a6268;
    border-color: #545b62;
  }
`;

export const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

export const ImagePreview = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  
  img {
    max-width: 100%;
    max-height: 300px;
    object-fit: contain;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;

export const GridItem = styled.div`
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AuthorName = styled.p`
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const PageButton = styled(Button)`
  margin: 0 5px;
  ${props => props.active && `
    background-color: #007bff;
    border-color: #007bff;
    color: white;
  `}
`;

export const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
`;

export const ImageUploadButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  color: #333;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: #e0e0e0;
  }
`;

export const SubmitButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #45a049;
  }
`;

export const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ContentContainer = styled.div`
  margin-bottom: 20px;  // 게시글 목록과 페이지네이션 사이의 간격 조정
  min-height: 300px;  // 최소 높이 설정으로 게시글이 적을 때도 레이아웃 유지
`;

export const CommentSection = styled.div`
  margin-top: 20px;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 10px;
`;

export const CommentSubmitButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;