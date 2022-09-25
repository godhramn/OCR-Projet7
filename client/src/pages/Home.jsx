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
        <Container fixed>
          <Box
            className="thread-container"
            border="0.5px solid black"
            borderRadius="20px"
            boxShadow="2px 2px 2px grey"
            bgcolor="#4E5166"
            sx={{
              marginLeft:"3rem",
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