import React from 'react';
import Logo from '../assets/logos/icon-black.png';
import { Box, Container } from '@mui/material'

const Header = () => {
  return (
    <header>
      <Box
        textAlign="center"
        boxShadow="0px 2px 2px grey"
        sx={{
          maxHeight:"130px",
          marginLeft:"3.5rem"
        }}
      >
        <Container maxWidth="sm">
          <img 
            src={Logo} 
            alt="nom de l'entreprise Groupomania"
            width="100%"
            height="100%"
          />
        </Container>
      </Box>
    </header>
  );
};

export default Header;