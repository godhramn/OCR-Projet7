import React, { useContext } from 'react';
import Log from '../components/Log';
import { Box } from '@mui/material';
import { UidContext } from '../components/AppContext'

const Connect = () => {
  const uid = useContext(UidContext)
  return (
    <>
      <div className='profil-page'>
        {uid ? (<h1>UPDATE PAGE</h1>) : (
          <Box className='log-container'>
            <Log signin={false} signup={true} />
          </Box>
        )}
      </div>
    </>
  );
};

export default Connect;

