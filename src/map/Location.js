import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [coordinates, setCoordinates] = useState(null);

    const fetchCoordinates = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    
                    try {
                        const response = await axios.post('http://localhost:8080/api/currentLocation', {
                            latitude,
                            longitude
                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        setCoordinates(response.data);
                    } catch (error) {
                        console.error('Error fetching coordinates:', error);
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div>
            <button onClick={fetchCoordinates}>Get Coordinates</button>
            {coordinates && <pre>{JSON.stringify(coordinates, null, 2)}</pre>}
        </div>
    );
};

export default App;
