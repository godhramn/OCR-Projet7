import React, { useContext } from 'react';
import Log from '../components/Log';
import { Box } from '@mui/material';
import { UidContext } from '../components/AppContext'
import NavbarLeft from '../components/NavbarLeft'

const Connect = () => {
  const uid = useContext(UidContext)
  return (
    <>
      <main className='profil-page'>
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
          <Box 
            className='log-container'
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            sx={{
              marginTop:"8rem"
            }}
          >
            <Log signin={false} signup={true} />
          </Box>
        )}
      </main>
    </>
  );
};

export default Connect;

