import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


const MarkerModal = ({ show, onClose, markerData }) => {
    const [matchStatus, setMatchStatus] = useState(null); 
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
  
    useEffect(() => {
      const checkMatchStatus = async () => {
        if (markerData) {
          const match_Id = markerData.data.matchingId;
          try {
            const response = await axios.get(`http://localhost:8080/matchings/stand-by/${match_Id}`);
            if (response.status === 200) {
              setMatchStatus('MatchRegistered'); 
            } 
          } catch (error) {
            if (error.response && error.response.status === 404) {
              setMatchStatus('MatchNotRegistered'); 
            } else {
              console.error('알 수 없는 오류입니다.', error);
              setMatchStatus('error'); 
            }
          } finally {
            setLoading(false); // 데이터 로드가 완료되면 로딩 상태를 false로 설정
          }
        }
      };
  
      if (show) { 
        setLoading(true); // 모달이 열릴 때 로딩 상태를 true로 설정
        checkMatchStatus();  
      }
    }, [show, markerData]);
  
    const handleMatchRequest = async () => {
      const userConfirmed = window.confirm('매칭 신청하시겠습니까?');
      if (userConfirmed) {
        try {
          const match_Id = markerData.data.matchingId;
          await axios.post(`http://localhost:8080/matchings/stand-by/${match_Id}`);
          alert('매칭 신청 완료!');
          onClose(); 
        } catch (error) {
          console.error('매칭 신청 실패:', error);
          alert('매칭 신청에 실패했습니다.'); 
        }
      }
    };
  
    const getButtonText = () => {
      if (loading) {
        return '로딩 중...'; // 로딩 중일 때 표시할 텍스트
      }
      if (matchStatus === 'MatchRegistered') {
        return '이미 신청된 매칭입니다';
      }
      return '매칭 신청하기';
    };
  
    const isButtonDisabled = loading || matchStatus === 'MatchRegistered';
  
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>매칭할래멍</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {markerData ? (
            <>
              <p>닉네임: {markerData.data.memberNickname}</p>
              <p>생년월일: {markerData.data.memberYearOfBirth}</p>
              <p>성별: {markerData.data.memberGender}</p>
              <p>댕댕이름: {markerData.data.petName}</p>
              {markerData.data.petProfile ? (
                <div>
                  <p>펫 프로필 이미지:</p>
                  <img 
                    src={markerData.data.petProfile} 
                    alt={`${markerData.data.petName} 프로필`} 
                    style={{ width: '100%', height: 'auto', maxWidth: '400px', borderRadius: '8px' }}
                  />
                </div>
              ) : (
                <p>펫 프로필 이미지가 없습니다.</p>
              )}
              <p>댕댕이 탄생일: {markerData.data.petYearOfBirth}</p>
              <p>댕댕 사이즈: {markerData.data.petSize}</p>
              <p>댕댕이 성격: {markerData.data.petPersonality}</p>
              <p>댕댕이 성별: {markerData.data.petNeutered}</p>
            </>
          ) : (
            <p>정보를 불러오는 중...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={handleMatchRequest } 
            disabled={isButtonDisabled}
          >
            {getButtonText()}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
   export default MarkerModal;