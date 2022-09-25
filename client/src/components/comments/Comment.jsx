import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@mui/material'

function Comment({ updateComment, comment, commentId }) {
  const commentsData = useSelector((state) => state.comments.comments);
  const [content, setContent] = useState('');

  const handleComment = (e) => {
    e.preventDefault();

    if (content) {
      axios({
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}api/comments/${comment._id}`,
        withCredentials: true,
        data: { content },
      })
        .then((res) => {
          alert('Commentaire modifié');
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  if (commentsData !== null) {
    return (
      <>
        {(updateComment === false || commentId !== comment._id) && (
          <div className='content'>{comment.content}</div>
        )}
        {updateComment === true && commentId === comment._id && (
          <>
            <label htmlFor='commentContent'></label>
            <textarea
              name='commentContent'
              id='commentContent'
              defaultValue={comment.content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className='comment-btn-bloc'>
              <Button onClick={handleComment}>Valider</Button>
            </div>
          </>
        )}
      </>
    );
  }
}

export default Comment;