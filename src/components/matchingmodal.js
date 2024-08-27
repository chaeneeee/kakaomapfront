import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

// 리스트 항목을 나타내는 컴포넌트
function ListItem({ petImg, name, createdAt, status, mode, matchingDone, setMatchingDone, matchingStandById}) {
  const [isClicked, setIsClicked] = useState(false); // 버튼 클릭 상태
  const [isMatched, setIsMatched] = useState(false); // 매칭 성사 상태

  // 버튼 클릭 시 색상을 변경하는 함수 (Host)
  const handleHostButtonClick = async () => {
    const confirmResult = window.confirm('정말로 매칭요청을 수락하시겠습니까?');

    if (confirmResult) {
      try {
        // 사용자가 확인한 경우 PATCH 요청
        const response = await axios.patch(`http://localhost:8080/matchings/stand-by/${matchingStandById}`, {
          'status': 'STATUS_SUCCESS',
        },{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer your_token_here'
            }
        });

        if (response.status === 200) {
          // PATCH 성공 시 매칭 상태 변경
          setIsClicked(true);
          setIsMatched(true); // 매칭 성사 상태를 true로 변경
          setMatchingDone(true); // 매칭 완료 상태를 부모에 전달 (모든 버튼 회색화)
        }
      } catch (error) {
        console.error('Error while patching:', error);
      }
    }
  };

  // 버튼 클릭 시 색상을 변경하는 함수 (Guest)
  const handleGuestButtonClick = async () => {
    const confirmResult = window.confirm('정말로 매칭요청을 취소하시겠습니까?');

    if (confirmResult) {
      try {
        // 사용자가 확인한 경우 PATCH 요청
        const response = await axios.patch(`http://localhost:8080/matchings/stand-by/${matchingStandById}`, {
          'status': 'STATUS_FAIL',
        });

        if (response.status === 200) {
          // PATCH 성공 시 매칭 상태 변경
            setIsClicked(true);
            setIsMatched(true); // 매칭 성사 상태를 true로 변경
        }
      } catch (error) {
        console.error('Error while patching:', error);
      }
    }
  };

  return (
    <div style={{ border: '3px solid #8CAF3C', padding: '10px',
                  background: '#ADD94A', marginBottom: '10px', 
                  borderRadius: '20px'}}>
      <Row>
        {/* 이미지 부분 */}
        <Col xs={5} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            src={petImg || 'https://via.placeholder.com/80'} // 이미지가 없을 경우 기본 이미지
            roundedCircle
            style={{
              border: '3px solid #8CAF3C',
              width: '80px', // 이미지 너비를 80px로 설정
              height: '80px', // 이미지 높이를 80px로 설정
            }}
          />
        </Col>

        {/* 텍스트 부분 */}
        <Col xs={4}>
          <div style={{fontSize: '20px', fontWeight: 'bold',marginBottom: '5px', padding: '5px' }}>{name}</div>
          <div style={{fontSize: '20px', fontWeight: 'bold',padding: '5px' }}>{createdAt}</div>
        </Col>

        {/* 버튼 부분 */}
        <Col xs={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {mode === "host" ? (
            <Button
              onClick={handleHostButtonClick}
              disabled={matchingDone} // 매칭 완료 후 버튼 비활성화
              style={{
                border: '2px solid brown',
                backgroundColor: isMatched ? 'green' : (matchingDone ? 'gray' : 'blue'), // 매칭 성사 시 초록색, 매칭 완료 후 회색
              }}
            >
              {isMatched ? "매칭 성사" : (matchingDone ? "매칭 완료" : status)}
            </Button>
          ) : (
            <Button
              onClick={handleGuestButtonClick}
              disabled={matchingDone} // 매칭 완료 후 버튼 비활성화
              style={{
                border: '2px solid brown',
                backgroundColor: isMatched ? 'gray' : (matchingDone ? 'gray' : 'blue'), // 매칭 성사 시 초록색, 매칭 완료 후 회색
              }}
            >
              {isMatched ? "매칭 취소" : (status === "응답 대기" ? (isClicked ? "요청 취소" : "매칭 거절") : status)}
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}

// 메인 모달 컴포넌트
function MatchingModal() {
  const [show, setShow] = useState(false);
  const [matchingHostData, setmatchingHostData] = useState([]); // 매칭 데이터를 저장할 상태
  const [matchingGuestData, setmatchingGuestData] = useState([]); // 매칭 데이터를 저장할 상태
  const [matchingDone, setMatchingDone] = useState(false); // 매칭 완료 상태

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 모달이 열릴 때 데이터를 가져오는 함수
  useEffect(() => {
    if (show) {
      const fetchmatchingHostData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/matchings/stand-by/host?page=1&size=10`);
          setmatchingHostData(response.data.data); // data만 저장 (pageInfo는 제외)
        } catch (error) {
          console.error('Error fetching matching_host data:', error);
        }
      };
      fetchmatchingHostData();
      const fetchmatchingGuestData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/matchings/stand-by/guest?page=1&size=10`);
          setmatchingGuestData(response.data.data); // data만 저장 (pageInfo는 제외)
        } catch (error) {
          console.error('Error fetching matching_guest data:', error);
        }
      };
      fetchmatchingGuestData();
    }
  }, [show]); // 모달이 열릴 때 호출

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch Modal
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>매칭 목록</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#f0f0f0' }}>
          <Row style={{gap:'10px'}}>
            {/* Left Area */}
            <Col xs={12} md={5} style={{ border: '5px solid #8CAF3C', padding: '10px',
                                         maxHeight: '400px', overflowY: 'auto',
                                         borderRadius: '30px', flexGrow: 1,}}>
              <h5 style={{ color: 'blue' }}>받은 매칭 요청 - [host]</h5>
                {matchingHostData.length > 0 ? (
                    matchingHostData.map((item) => (
                        <ListItem
                        key={item.matchingStandById}
                        petImg={item.partnerPetImage}
                        name={item.partnerNickName}
                        createdAt={item.createdAt}
                        status={item.status}
                        mode="host"
                        matchingDone={matchingDone}
                        setMatchingDone={setMatchingDone}
                        matchingStandById={item.matchingStandById} // PATCH 요청에 필요한 ID 전달
                        />
                    ))
                    ) : (
                    <p style={{ color: 'gray', textAlign: 'center' }}>받은 매칭 요청이 없습니다.</p>
                    )
                }
            </Col>

            {/* Right Area */}
            <Col xs={12} md={5} style={{ border: '5px solid #8CAF3C', padding: '10px',
                                         maxHeight: '400px', overflowY: 'auto',
                                         borderRadius: '30px', flexGrow: 1,}}>
              <h5 style={{ color: 'blue' }}>보낸 매칭 요청 - [guest]</h5>
                {matchingGuestData.length > 0 ? (
                    matchingGuestData.map((item) => (
                        <ListItem
                        key={item.matchingStandById}
                        petImg={item.partnerPetImage}
                        name={item.partnerNickName}
                        createdAt={item.createdAt}
                        status={item.status}
                        mode="guest"
                        matchingDone={matchingDone}
                        setMatchingDone={setMatchingDone}
                        matchingStandById={item.matchingStandById}
                        />
                    ))
                    ) : (
                    <p style={{ color: 'gray', textAlign: 'center' }}>보낸 매칭 요청이 없습니다.</p>
                    )
                }
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MatchingModal;
