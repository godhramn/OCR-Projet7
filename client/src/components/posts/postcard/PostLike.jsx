import React, { useContext, useState } from 'react';
import { UidContext } from '../../AppContext';
import axios from 'axios';
import { Grid, IconButton } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function PostLike({ post, postId, setPostId }) {
  const uid = useContext(UidContext);

  const [like, setLike] = useState('');
  const [sendLike, setSendLike] = useState(false);

  if (sendLike === true) {
    const handleLikes = async () => {
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/posts/${postId}/like`,
        withCredentials: true,
        data: {
          userId: uid,
          like,
        },
      })
        .then(() => {
          setPostId('');
          setLike('');
          setSendLike(false);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    };
    handleLikes();
  }

  return (
    <Grid 
    container 
    direction="row" className='like-bloc'>
      <div>
        <p>{post.likes}</p>
        {!post.usersLiked.includes(uid) && (
          <IconButton 
            aria-label='like'
            className='like-btn'
            onClick={() => {
              setLike(1);
              setPostId(post._id);
              setSendLike(true);
            }}
          > <ThumbUpIcon />
          </IconButton>
        )}
        {post.usersLiked.includes(uid) && (
          <IconButton
            aria-label='like'
            disabled
            className='like-btn'
            onClick={() => {
              setLike(0);
              setPostId(post._id);
              setSendLike(true);
            }}
          > <ThumbUpIcon />
          </IconButton>
        )}
      </div>
      <div>
        <p>{post.dislikes}</p>
        {!post.usersDisliked.includes(uid) && (
          <IconButton 
            aria-label='dislike'
            className='dislike-btn'
            onClick={() => {
              setLike(-1);
              setPostId(post._id);
              setSendLike(true);
            }}
          > <ThumbDownIcon />
          </IconButton>
        )}
        {post.usersDisliked.includes(uid) && (
          <IconButton
            aria-label='dislike'
            disabled
            className='dislike-btn'
            onClick={() => {
              setLike(0);
              setPostId(post._id);
              setSendLike(true);
            }}
          > <ThumbDownIcon />
          </IconButton>
        )}
      </div>
    </Grid>
  );
}

export default PostLike;