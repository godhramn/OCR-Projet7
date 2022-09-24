import React, { useContext } from 'react';
import NavbarLeft from '../components/NavbarLeft';
import Thread from '../components/posts/Thread';
import Header from '../components/Header';

import { Box } from '@mui/material';


const Home = () => {

  return (
    <>
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
        <Box
          display="flex"
          flexDirection="column"
          alignContent="center"          
          sx={{
            width: "80%"
          }}
        >
          <Box
            boxShadow="0px 3px 2px grey"
            sx={{
              width: "100%",
              marginBottom: "20px"
            }}
          >
            <Header />
          </Box>
          <Box
            border="0.5px solid black"
            borderRadius="20px"
            boxShadow="2px 2px 2px grey"
            sx={{
              padding: "5%",
              width: "100%"
            }}
          >
            <Thread />
          </Box>
        </Box>
      </Box>
      
    </>
  );
};

export default Home;