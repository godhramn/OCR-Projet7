import axios from "axios";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../../AppContext";
import { Avatar } from '@mui/material';

function PostUser({ post }) {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.users.users);

  if (usersData !== null) {
    return (
      <>
        {usersData.map(
          (user) =>
            user._id === post.author && (
              <div className="author-card" key={user._id}>
                <a href={`/profil/${user._id}`}>
                  <Avatar className="author-image" src={user.imageURL} alt="Photo de profil de l'auteur"/>
                  <div className="author-informations">
                    <div className="name">
                      {user.username}
                    </div>
                  </div>
                </a>
              </div>
            )
        )}
      </>
    );
  }
}

export default PostUser;