import React, { useContext } from 'react';

import Log from '../components/Log';
import { UidContext } from '../components/AppContext';
import NavbarLeft from '../components/NavbarLeft';
import UserProfil from '../components/users/UserProfil'

import { Box, Container } from '@mui/material';

const Connect = () => {
  const uid = useContext(UidContext)
  return (
    <>
      <main className='profil-page'>
        {uid ? (
          <>
            <Box>
              <Box
                sx={{
                  width: "10%"
                }}
              >
                <NavbarLeft />
              </Box>
            </Box>
            <Container maxWidth="xs">
              <UserProfil />
            </Container>
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

