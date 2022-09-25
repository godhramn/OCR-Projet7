import axios from 'axios';
import React from 'react';
import { IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function PostUpdateHandle({
  post,
  updatePost,
  setUpdatePost,
  postId,
  setPostId,
  imageURL,
  setImageURL,
  content,
  setContent,
  setDeletePost,
}) {
  const handlePost = (e) => {
    e.preventDefault();

    if (imageURL) {
      const data = new FormData();

      data.append('content', content);
      data.append('image', imageURL);

      axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
        withCredentials: true,
        data: data,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(() => {
          alert('Informations modifiées');
          setUpdatePost(false);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
        withCredentials: true,
        data: { content },
      })
        .then(() => {
          alert('Informations modifiées');
          setUpdatePost(false);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {updatePost === false && (
        <IconButton
          aria-label="Modifier le post"
          onClick={() => {
            setUpdatePost(true);
            setDeletePost(false);
            setPostId(post._id);
            setContent(post.content);
            setImageURL(post.imageURL);
          }}
        >
          <EditIcon />
        </IconButton>
      )}
      {updatePost === true && postId !== post._id && (
        <IconButton
          aria-label="Modifier le post"
          onClick={() => {
            setPostId(post._id);
            setContent(post.content);
            setImageURL(post.imageURL);
          }}
        >
          <EditIcon />
        </IconButton>
      )}
      {updatePost === true && postId === post._id && (
        <div className='update-post-Handle'>
          <Button
            className='update-post-btn'
            form='update-post'
            type='submit'
            onClick={handlePost}
          >
            Valider
          </Button>
          <Button
            className='update-post-btn'
            onClick={() => {
              setUpdatePost(false);
              setPostId('');
              setContent('');
              setImageURL('');
            }}
          >
            Annuler
          </Button>
        </div>
      )}
    </>
  );
}

export default PostUpdateHandle;