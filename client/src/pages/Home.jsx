import React from 'react';
import NavbarLeft from '../components/NavbarLeft';
import Thread from '../components/posts/Thread';
import Header from '../components/Header';
import { Box, Container } from '@mui/material';


const Home = () => {

  return (
    <>
      <Header />
      <Box
        display="flex"
        flex-direction="column"
        sx={{
          height: "100%",
          width: "100%"
        }}
      >
        <Box
          sx={{
            width: "10%"
          }}
        >
          <NavbarLeft />
        </Box>
     
        <Container
          maxWidth="m"
        >
          <Box
            border="0.5px solid black"
            borderRadius="20px"
            boxShadow="2px 2px 2px grey"
            bgcolor="#4E5166"
            sx={{
              margin:"2rem"
            }}
          >
            <Thread />
          </Box>  
        </Container>
      </Box>
    </>
  );
};

export default Home;