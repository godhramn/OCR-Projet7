import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logo from '../assets/logos/icon-red.png';
import LogOut from './Log/LogOut'
import Modal from './Modal'
import { getPostsData, createPost } from "../redux/postSlice";


import { Input, Grid, Box, List, ListItem, ListItemIcon, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";


const NavbarLeft = () => {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = React.useState(false);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const [postText, setPostText] = React.useState("");
  const handleAddPost =  () => {
    const data = createPost({ content: postText });
    if (data) {
      dispatch(getPostsData());
      setPostText("");
    }
  };

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
          <IconButton
            onClick={handleModalOpen}
            variant="contained"
            color="primary"
            style={{
              borderRadius: "28px",
              padding: "0 15px",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>
      </nav>
      {openModal && (
        <Modal
          open={openModal}
          handleClose={handleModalClose}
          saveText={"Post"}
          len={postText.trimStart().length}
          handleSave={handleAddPost}
        >
          <Box>
            <Grid container>
              <Grid item>
                <img src={Logo} alt="logo de l'entreprise Groupomania" width="60px" />
              </Grid>
              <Grid item flexGrow="1">
                <Box padding=".5rem 0">
                  <Input
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    multiline
                    rows="2"
                    disableUnderline
                    type="text"
                    placeholder="Exprimez-vous ici"
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </>
  )
}

export default NavbarLeft