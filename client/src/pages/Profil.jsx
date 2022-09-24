import React, { useContext } from 'react';
import Log from '../components/Log';
import { Box } from '@mui/material';
import { UidContext } from '../components/AppContext'
import NavbarLeft from '../components/NavbarLeft'

const Connect = () => {
  const uid = useContext(UidContext)
  return (
    <>
      <div className='profil-page'>
        {uid ? (
          <>
            <Box
              display="flex"
              flex-direction="column"
            >
              <Box
                sx={{
                  width: "10%"
                }}
              >
                <NavbarLeft />
              </Box>
              <Box>
                Profil Page
              </Box>
            </Box>
          </>
        
        ) : (
          <Box className='log-container'>
            <Log signin={false} signup={true} />
          </Box>
        )}
      </div>
    </>
  );
};

export default Connect;

