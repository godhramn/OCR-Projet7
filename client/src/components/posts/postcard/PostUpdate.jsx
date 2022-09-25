import React, { useState } from 'react';

import { Box, Button, TextField } from '@mui/material';

function PostUpdate({ post, setContent, setImageURL }) {
  const [uploadImage, setUploadImage] = useState(false);

  return (
    <>
      <form id='update-post'>
        <Box className='post-content'>
          <label htmlFor='content'></label>
          <TextField
            fullWidth
            name='content'
            id='content'
            defaultValue={post.content}
            onChange={(e) => setContent(e.target.value)}
          />

          {post.imageURL && (
            <div className='post-image'>
              <img
                src={post.imageURL}
                alt='Illustration de la publication'
              ></img>
              {uploadImage === false && (
                <Button
                  variant="contained"
                  sx={{
                    fontSize:"0.7rem",
                    marginTop:"1rem",
                  }}
                  className='edit-post-btn'
                  onClick={() => setUploadImage(true)}
                >
                  Modifier l'image
                </Button>
              )}
            </div>
          )}

          {!post.imageURL && (
            <div className='post-image'>
              {uploadImage === false && (
                <Button
                  variant="contained"
                  sx={{
                    fontSize:"0.7rem",
                    marginTop:"1rem",
                  }}
                  className='edit-post-btn'
                  onClick={() => setUploadImage(true)}
                >
                  Ajouter une image
                </Button>
              )}
            </div>
          )}

          {uploadImage === true && (
            <>
              <div className='post-image'>
                <label htmlFor='file'></label>
                <input
                  type='file'
                  id='file'
                  className='choose-image'
                  accept='.jpg, .jpeg, .png'
                  onChange={(e) => setImageURL(e.target.files[0])}
                />
                <div className='edit-post-btn-bloc'>
                  <Button
                    className='edit-post-btn'
                    onClick={() => {
                      setUploadImage(false);
                      setImageURL(post.imageURL);
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </>
          )}
        </Box>
      </form>
    </>
  );
}

export default PostUpdate;