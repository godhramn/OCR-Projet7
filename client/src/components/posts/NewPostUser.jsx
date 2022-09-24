import React from "react";
import { useSelector } from "react-redux";
import { Avatar } from '@mui/material';

function NewPostUserCard() {
  const userData = useSelector((state) => state.user.user);

  return (
    <div className="user">
      <Avatar className="user-picture" src={userData.picture} alt="Photo de profil de l'utilisateur"/>
      <div className="user-informations">
        <div className="name">
          {userData.username}
        </div>
      </div>
    </div>
  );
}

export default NewPostUserCard;