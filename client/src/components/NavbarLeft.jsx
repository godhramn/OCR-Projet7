import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UidContext } from './AppContext';
import Logo from '../assets/logos/icon-red.png';
import LogOut from './Log/LogOut'

import { Box, List, ListItem, ListItemIcon, useTheme } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";


const NavbarLeft = () => {
  const uid = useContext(UidContext);
  const theme = useTheme();

  return (
    <>
      <nav>
        <Box className="nav-container"
          textAlign="center"
          sx={{
            height: "100vh",
            maxWidth: "100%",
          }}
          bgcolor="#FFD7D7"
        >
          <Box className="logo">
            <NavLink exact to='/'>
              <img src={Logo} alt="logo de l'entreprise groupomania" width="50px" />
            </NavLink>
          </Box>
          <List>
            
            <NavLink 
              to='/profil'
              style={{
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "inherit",
              }}
            >
              <ListItem
                button
                sx={{
                  borderRadius: "28px",
                  margin: ".5rem 0",
                }}
              >
                <ListItemIcon>
                  <PersonIcon fontSize="medium" color="action" />
                </ListItemIcon>
              </ListItem>
            </NavLink>
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                backgroundColor: "inherit",
              }}
            >
              <ListItem
                button
                sx={{
                  borderRadius: "28px",
                  margin: ".5rem 0",
                }}
              >
                <ListItemIcon>
                  <HomeIcon fontSize="medium" color="action" />
                </ListItemIcon>
              </ListItem>
            </NavLink>
            <LogOut />
          </List>
        </Box>
      </nav>
    </>
  )
}

export default NavbarLeft