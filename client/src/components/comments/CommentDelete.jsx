import React from 'react';
import axios from 'axios';

import { Button, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function CommentDelete({
  comment,
  commentId,
  setCommentId,
  deleteComment,
  setDeleteComment,
  setUpdateComment,
}) {
  const handleDeleteComment = (e) => {
    e.preventDefault();

    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/comments/${commentId}`,
      withCredentials: true,
    })
      .then(() => {
        // dispatch(updateUserInformations);
        alert("Commentaire supprimé !");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {(commentId !== comment._id || deleteComment === false) && (
        <IconButton
          onClick={() => {
            setDeleteComment(true);
            setUpdateComment(false);
            setCommentId(comment._id);
          }}
        >
          <DeleteForeverIcon />
        </IconButton>
      )}
      {deleteComment === true && comment._id === commentId && (
        <div className='delete-comment-interaction'>
          <p>Voulez-vous vraiment supprimer ce commentaire ?</p>
          <Button 
            className='delete-comment-btn' 
            onClick={handleDeleteComment}
            variant="contained"
          >
            Oui
          </Button>
          <Button
            className='delete-comment-btn'
            onClick={() => {
              setDeleteComment(false);
              setCommentId('');
            }}
            variant="contained"
          >
            Non
          </Button>
        </div>
      )}
    </>
  );
}

export default CommentDelete;