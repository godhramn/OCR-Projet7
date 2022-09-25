import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PostUpdate from './PostUpdate';
import PostUpdateHandle from './PostUpdateHandle';
import PostDelete from './PostDelete';
import PostLike from './PostLike';
import PostUser from './PostUser';
import PostComments from '../../comments/PostComments';
import NewComment from '../../comments/NewComment';

import { Button, Box } from '@mui/material';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function PostCard() {
  const userData = useSelector((state) => state.user.user);
  const postsData = useSelector((state) => state.posts.posts);
  const commentsData = useSelector((state) => state.comments.comments);

  const [unrolledComments, setUnrolledComments] = useState(false);
  const [newComment, setNewComment] = useState(false);

  const [updatePost, setUpdatePost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const [postId, setPostId] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [content, setContent] = useState('');

  if (userData !== null && postsData !== null && commentsData !== null) {
    return (
      <>
        {postsData
          .slice(0)
          .reverse()
          .map((post) => {
            return (
              <>
                <article key={post._id}>
                  <Box
                    border="1px solid grey"
                    borderRadius="10px"
                    boxShadow="3px 2px 2px grey"
                    bgcolor="white"
                    sx={{
                      margin:"2rem 1rem",
                      padding:"1rem"
                    }}
                  >
                    <Box
                      bgcolor="#FFD7D7"
                      textAlign="center"
                      display="flex"
                      borderRadius="10px"
                      sx={{
                        width:"100%",
                        marginBottom:"1rem",
                        padding:"0.3rem"
                      }}
                    >
                      <PostUser post={post} />
                    </Box>
                    {(updatePost === false || postId !== post._id) && (
                      <Box   
                        className='post-content'
                        border="1px solid grey"
                        borderRadius="10px"
                        sx={{
                          minHeight:"4rem",
                          padding:"1rem"
                        }}
                      >
                        <div className='post-text'>{post.content}</div>
                        {post.imageURL && (
                          <Box
                            sx={{
                              maxWidth:"50%",
                              margin:"1rem",
                            }} 
                            className="post-image"
                          >
                            <img
                              src={post.imageURL}
                              alt="Illustration de la publication"
                            ></img>
                          </Box>
                        )}
                      </Box>
                    )}

                    {updatePost === true && postId === post._id && (
                      <>
                        <PostUpdate
                          post={post}
                          setContent={setContent}
                          setImageURL={setImageURL}
                        />
                      </>
                    )}

                    {(userData._id === post.author ||
                      userData.isAdmin === true) && (
                      <Box 
                        className='post-interaction'
                        display="flex"
                        justifyContent="flex-end"
                      >
                        <PostUpdateHandle
                          post={post}
                          updatePost={updatePost}
                          setUpdatePost={setUpdatePost}
                          postId={postId}
                          setPostId={setPostId}
                          imageURL={imageURL}
                          setImageURL={setImageURL}
                          content={content}
                          setContent={setContent}
                          setDeletePost={setDeletePost}
                        />

                        <PostDelete
                          post={post}
                          setUpdatePost={setUpdatePost}
                          postId={postId}
                          setPostId={setPostId}
                          deletePost={deletePost}
                          setDeletePost={setDeletePost}
                        />
                      </Box>
                    )}

                    <Box 
                      className='interaction'
                      sx={{
                        width:"100%",
                        height:"100%"
                      }}
                    >
                      <PostLike post={post} postId={postId} setPostId={setPostId} />

                      <Box 
                        className='comment-interaction'
                        display="flex"
                        justifyContent="space-evenly"
                        sx={{
                          height:"2rem",
                          
                        }}
                      >
                        {(unrolledComments === false || postId !== post._id) && (
                          <Button
                            variant="outlined"
                            endIcon={<ArrowCircleUpOutlinedIcon />}
                            onClick={() => {
                              setUnrolledComments(true);
                              setPostId(post._id);
                            }}
                            sx={{
                              width:"40%",
                              height:"100%",
                              fontSize:"0.6rem"
                            }}
                          >
                            Afficher les commentaires
                          </Button>
                        )}
                        {unrolledComments === true && postId === post._id && (
                          <Button
                            sx={{
                              width:"40%",
                              height:"100%",
                              fontSize:"0.6rem"
                            }}
                            variant="outlined"
                            endIcon={<ArrowCircleDownOutlinedIcon />}
                            onClick={() => {
                              setUnrolledComments(false);
                              setNewComment(false);
                              setPostId('');
                            }}
                          >
                            Masquer les commentaires
                          </Button>
                        )}
                        {(newComment === false || postId !== post._id) && (
                          <Button
                            sx={{
                              width:"40%",
                              height:"100%",
                              fontSize:"0.6rem"
                            }}
                            variant="outlined"
                            endIcon={<AddCircleIcon />}
                            onClick={() => {
                              setUnrolledComments(true);
                              setNewComment(true);
                              setPostId(post._id);
                            }}
                          >
                            Ajouter un commentaire
                          </Button>
                        )}
                        {newComment === true && postId === post._id && (
                          <Button
                            sx={{
                              width:"40%",
                              height:"100%"
                            }}
                            variant="outlined"
                            endIcon={<CancelIcon />}
                            onClick={() => {
                              setNewComment(false);
                            }}
                          >
                            Annuler
                          </Button>
                        )}
                      </Box>
                    </Box>

                    <Box
                      border="1px solid #EEEEEE"
                      sx={{
                        marginTop:"1rem"
                      }}
                      className='comments'
                    >
                      {newComment === true && postId === post._id && (
                        <NewComment post={post} />
                      )}
                      {commentsData &&
                        unrolledComments === true &&
                        postId === post._id && <PostComments post={post} />}
                    </Box>
                  </Box>
                </article>
              </>
            );
          })}
      </>
    );
  }
}

export default PostCard;