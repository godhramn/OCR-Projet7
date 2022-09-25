import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Box } from '@mui/material';

function NewPostUserCard() {
  const userData = useSelector((state) => state.user.user);

  return (
    <Box 
      className="user"
      sx={{
        display: "flex",
        alignItems:"center",
        bgcolor: "#FFD7D7",
        borderRadius: "10px 10px 0 0 ",
      }}
    >
      <Avatar sx={{ margin:"0.5rem"}} className="user-picture" src={userData.picture} alt="Photo de profil de l'utilisateur"/>
      <div className="user-informations">
        <div className="name">
          {userData.username}
        </div>
      </div>
    </Box>
  );
}

export default NewPostUserCard;