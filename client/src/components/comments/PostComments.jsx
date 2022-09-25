import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { UidContext } from '../AppContext';
import CommentDelete from './CommentDelete';

import { Button, Avatar, Box, IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';


import Comment from './Comment';

function PostComments({ post }) {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.user.user);
  const commentsData = useSelector((state) => state.comments.comments);
  const usersData = useSelector((state) => state.users.users);

  const [updateComment, setUpdateComment] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);
  const [commentId, setCommentId] = useState('');

  if (usersData !== null) {
    return (
      <>
        {commentsData.map(
          (comment) =>
            comment.postId === post._id && (
              <Box 
                className='comment-card' key={comment._id}
                boxShadow="2px 2px 2px grey"
                borderRadius="10px"
                border="1px solid grey"
                sx={{
                  margin: "1rem 0",
                  padding: "1rem"
                }}
              >
                <Box 
                  className='comment-author'
                  borderBottom="1px solid grey"
                  borderRadius="10px"
                  bgcolor="#EEEEEE"
                  marginBottom="1rem"
                >
                  {usersData.map(
                    (author) =>
                      author._id === comment.author && (
                        <Box
                          sx={{
                            width:"10%",
                          }}
                          className='author-card' key={author._id}
                        >
                          <a href={`/profil/${author._id}`}>
                            <Box
                              sx={{
                                display:"flex",
                                alignItems:"center",
                              }}
                            >
                              <Avatar sx={{ margin:"0 0.5rem" }} className='author-image' src={author.picture} alt="Photo de profil de l'auteur"/>
                              <div className='author-informations'>
                                <div className='name'>
                                  {author.username}
                                </div>
                              </div>
                            </Box>
                          </a>
                        </Box>
                      )
                  )}
                </Box>
                <Box 
                  className='comment-content'
                  sx={{
                    border:"1px solid #EEEEEE",
                    borderRadius:"10px",
                    minHeight:"3rem",
                    padding:"0.5rem",
                  }}
                >
                  <Comment
                    updateComment={updateComment}
                    comment={comment}
                    commentId={commentId}
                  />
                </Box>
                {(comment.author === uid || userData.isAdmin === true) && (
                  <Box className='comment-interaction'>
                    {(updateComment === false || commentId !== comment._id) && (
                      <IconButton
                        onClick={() => {
                          setUpdateComment(true);
                          setCommentId(comment._id);
                        }}
                      >
                        <BorderColorIcon/>
                      </IconButton>
                    )}
                    {updateComment === true && commentId === comment._id && (
                      <Button
                        onClick={() => {
                          setUpdateComment(false);
                          setCommentId("");
                        }}
                      >
                        Annuler
                      </Button>
                    )}
                    <CommentDelete
                      comment={comment}
                      commentId={commentId}
                      setCommentId={setCommentId}
                      deleteComment={deleteComment}
                      setDeleteComment={setDeleteComment}
                      setUpdateComment={setUpdateComment}
                    />
                  </Box>
                )}
              </Box>
            )
        )}
      </>
    );
  }
}

export default PostComments;