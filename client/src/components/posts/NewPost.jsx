import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { UidContext } from '../AppContext';
import { Button, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

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
          <div className='new-post-card'>
            <Avatar className="user-picture" src={userData.picture} alt="Photo de profil de l'utilisateur"/>
            <div className='new-post-card-btn-bloc'>
              <Button
                className='new-post-card-btn'
                variant='contained'
                endIcon={<SendIcon />}
                onClick={() => setEditPost(true)}
              >
                Ajouter un post
              </Button>
            </div>
          </div>
        )}
        {editPost && (
          <div className='post-card'>
            <NewPostUser />
            <NewPostContent setPicture={setPicture} setContent={setContent} />
            <div className='submit-post-btn-bloc'>
              <input
                form='new-post'
                type='submit'
                className='submit-post-btn'
                value='Poster la publication'
                onClick={handlePost}
              />
              <button
                className='submit-post-btn'
                onClick={() => setEditPost(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default NewPost;