import axios from "axios";
import React from "react";
import { Button, IconButton } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

function PostDelete({
  post,
  setUpdatePost,
  postId,
  setPostId,
  deletePost,
  setDeletePost,
}) {
  const handleDeletePost = (e) => {
    e.preventDefault();

    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
      withCredentials: true,
    })
      .then(() => {
        alert("Publication supprimée !");
        setUpdatePost(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {(postId !== post._id || deletePost === false) && (
        <IconButton
          onClick={() => {
            setDeletePost(true);
            setUpdatePost(false);
            setPostId(post._id);
          }}
        >
          <DeleteForeverRoundedIcon/>
        </IconButton>
      )}
      {deletePost === true && post._id === postId && (
        <div className='delete-post-interaction'>
          <p>Voulez-vous vraiment supprimer cette publication ?</p>
          <Button className='delete-post-btn' onClick={handleDeletePost}>
            Confirmer
          </Button>
          <Button
            className='delete-post-btn'
            onClick={() => {
              setDeletePost(false);
              setPostId('');
            }}
          >
            Annuler
          </Button>
        </div>
      )}
    </>
  );
}

export default PostDelete;