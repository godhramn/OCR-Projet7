import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme, ListItem, ListItemIcon } from '@mui/material';

const LogOut = () => {
  const removeCookie = (key) => {
    if (window !== 'undefined') {
      cookie.remove(key, { expires: 1 });
    }
  };

  const LogOut = async () => {
    await axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/users/logout`,
      withCredentials: true,
    })
    .then(() => {
      localStorage.clear();
      removeCookie('access_token');
      window.location = '/profil';
    })
    .catch((error) => console.log(error));
  };

  const theme = useTheme();

  return (
    <>
      <ListItem
        button
        id="basic-button"
        sx={{
          borderRadius: "28px",
          margin: ".5rem 0",
        }}
        onClick={() => {
          LogOut();
        }}
      >
        <ListItemIcon>
          <LogoutIcon fontSize="medium" color="action" />
        </ListItemIcon>
      </ListItem> 
    </>
  );
};

export default LogOut;