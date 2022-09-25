import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { UidContext } from '../AppContext';
import { Button, Avatar, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CreateIcon from '@mui/icons-material/Create';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import NewPostContent from './NewPostContent';
import NewPostUser from './NewPostUser';

function NewPost() {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => state.user.user);
  const [editPost, setEditPost] = useState(false);

  const author = uid;
  const [picture, setPicture] = useState('');
  const [content, setContent] = useState('');

  const handlePost = (e) => {
    e.preventDefault();
    if (content === '') {
      alert('Publication vide');
    } else if (picture === '') {
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/posts`,
        withCredentials: true,
        data: { author, content },
      })
        .then((res) => {
          alert('Publication créée');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      const data = new FormData();

      data.append('author', author);
      data.append('content', content);
      data.append('image', picture);

      axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/posts`,
        withCredentials: true,
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((res) => {
          alert('Publication créée');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  if (userData !== null) {
    return (
      <>
        {editPost === false && (
          <Box 
            className='new-post-card'
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
              padding:"1rem"
            }}
          >
            <Avatar sx={{ width:"4rem", height:"4rem"}} className="user-picture" src={userData.picture} alt="Photo de profil de l'utilisateur"/>
            <Box 
              className='new-post-card-btn-bloc'
              sx={{
                marginTop:"1rem"
              }}
            >
              <Button
                className='new-post-card-btn'
                variant='contained'
                endIcon={<CreateIcon />}
                onClick={() => setEditPost(true)}
              >
                Ajouter un post
              </Button>
            </Box>
          </Box>
        )}
        {editPost && (
          <Box 
            className='post-card'
            sx={{
              padding:"1rem"
            }}
          >
            <NewPostUser />
            <NewPostContent setPicture={setPicture} setContent={setContent} />
            <Box
              className='submit-post-btn-bloc'
            >
              <Button
                sx={{
                  margin:"1rem",
                }}
                variant='contained'
                endIcon={<SendIcon />}
                form='new-post'
                type='submit'
                className='submit-post-btn'
                onClick={handlePost}
              >
                Envoyer
              </Button>
              <Button
                variant="outlined"
                endIcon={<CancelRoundedIcon />}
                className='submit-post-btn'
                onClick={() => setEditPost(false)}
              >
                Annuler
              </Button>
            </Box>
          </Box>
        )}
      </>
    );
  }
}

export default NewPost;