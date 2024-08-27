import React from 'react'
import { useBoostQuery } from '../../../hooks/useBoost'
import Alert from 'react-bootstrap/Alert';

const Banner = () => {
    const { data, isLoading, isError, error } = useBoostQuery();
    
    if (isLoading) {
        return <h1>Loading....</h1>
    }

    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>
    }
    
  return (
    <div>
      Banner
    </div>
  )
};

export default Banner
