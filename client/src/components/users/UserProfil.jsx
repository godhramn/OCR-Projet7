import React from 'react';
import { useSelector } from "react-redux";
import { dateParser } from '../Utils';
import UserUpdate from './UserUpdate';

import { Box, Avatar } from '@mui/material';

const UserProfil = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        border="1px solid grey"
        borderRadius="20px"    
        sx={{
          marginTop: "8rem",
          padding: "2rem",
          bgcolor: "white",
        }}
      >
        <Avatar 
        src={user.imageURL} 
        alt="profil de l'utilisateur" 
        sx={{
          width: "8rem",
          height: "8rem",
          margin: "2rem",
        }}
        />
        <UserUpdate user={user}/>

        <h2>{user.username}</h2>
        <h3>{user.email}</h3>
        <h4>Membre depuis le {dateParser(user.createdAt)}</h4>
      </Box>
    </>
  );
};

export default UserProfil;