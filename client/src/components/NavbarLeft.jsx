import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/logos/icon-red.png';
import LogOut from './Log/LogOut'

import { UidContext } from './AppContext';

import { Box, List, ListItem, ListItemIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";


const NavbarLeft = () => {
  const uid = useContext(UidContext);

  return (
    <>
      <nav className="navbar-left">
        <Box className="nav-container"
          textAlign="center"
          sx={{
            height: "100vh",
            width: "60px"
          }}
          bgcolor="#FFD7D7"
        >
          <Box className="logo">
            <NavLink to='/'>
              <img src={Logo} alt="logo de l'entreprise groupomania" width="50px" />
            </NavLink>
          </Box>
          <List>
            
            <NavLink 
              to={'/profil/' + uid}
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