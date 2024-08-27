import React, { useCallback } from 'react';
import axios from 'axios';

const saveMarker = async (latitude, longitude) => {
    try {
        await axios.post('http://localhost:8080/api/saveMarker', {
            latitude,
            longitude
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error saving marker:', error);
    }
};

// 마커를 저장할 때 saveMarker 호출
const handleMapClick = useCallback((event) => {
    const latLng = event.latLng;
    const latitude = latLng.getLat();
    const longitude = latLng.getLng();

    // 마커 생성 로직
    new kakao.maps.Marker({
        map: map,
        position: latLng
    });

    // 마커 정보를 서버에 저장
    saveMarker(latitude, longitude);
}, [map]);
