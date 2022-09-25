import React from "react";
import { useSelector } from "react-redux";

import { Avatar, Box } from '@mui/material';

function PostUser({ post }) {

  const usersData = useSelector((state) => state.users.users);

  if (usersData !== null) {
    return (
      <>
        {usersData.map(
          (user) =>
            user._id === post.author && (
              <Box className="author-card" key={user._id}>
                <a href={`/profil/${user._id}`}>
                  <Box
                    sx={{
                      display:"flex",
                      alignItems:"center",
                    }}
                  >
                    <Avatar sx={{ margin:"0 0.5rem"}} className="author-image" src={user.imageURL} alt="Photo de profil de l'auteur"/>
                    <div className="author-informations">
                      <div className="name">
                        {user.username}
                      </div>
                    </div>
                  </Box>
                </a>
              </Box>
            )
        )}
      </>
    );
  }
}

export default PostUser;