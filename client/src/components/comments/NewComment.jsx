import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Avatar, TextField, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function NewComment({ post }) {
  const userData = useSelector((state) => state.user.user);

  const [content, setContent] = useState('');
  const author = userData._id;
  const postId = post._id;

  const handleComment = (e) => {
    e.preventDefault();
    if (content === '') {
      alert("Commentaire vide");
    }
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/comments`,
      withCredentials: true,
      data: { author, content, postId },
    })
      .then((res) => {
        alert('Commentaire créé');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className='comment-card'>
        <Box className='comment-author'>
          <Box 
            className='author-card' 
            key={userData._id}
            sx={{
              display:"flex",
              alignItems:"center",
              bgcolor:"#EEEEEE",
            }}
          >
            <Avatar 
              sx={{
                margin:"0 0.5rem"
              }}
              className='author-image' src={userData.imageURL} alt="Photo de profil de l'auteur"/>
            <div className='author-informations'>
              <div className='name'>
                {userData.username}
              </div>
            </div>
          </Box>
        </Box>
        <div className='comment-content'>
          <label htmlFor='commentContent'></label>
          <TextField
            name='commentContent'
            id='commentContent'
            multiline
            fullWidth
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className='comment-btn-bloc'>
          <Button variant="outlined" endIcon={<SendIcon />} onClick={handleComment}>Envoyer</Button>
        </div>
      </div>
    </>
  );
}

export default NewComment;