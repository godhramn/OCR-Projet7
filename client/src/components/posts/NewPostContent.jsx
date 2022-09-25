import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material'

function NewPostContent({ setImageURL, setContent }) {
  const [uploadImage, setUploadImage] = useState(false);

  return (
    <div className='post-text'>
      <form id='new-post'>
        <label htmlFor='content'></label>
        <Box bgcolor='#EEEEEE'>
          <TextField
            multiline
            fullWidth
            label='Exprimez-vous'
            variant='filled'
            name='content'
            id='content'
            onChange={(e) => setContent(e.target.value)}
          ></TextField>
        </Box>
        {uploadImage === false && (
          <Box
            display='flex'
            justifyContent='flex-end'
          >
            <Button
              variant='contained'
              sx={{
                marginTop: '0.5rem'
              }}
              className='edit-post-btn'
              onClick={() => setUploadImage(true)}
            >
              Ajouter une image
            </Button>
          </Box>
          
        )}
        {uploadImage === true && (
          <>
            <Box
              display='flex'
              flexDirection='column'
              alignItems='flex-end'
              sx={{
                marginTop: '0.5rem'
              }}
            >
              <label htmlFor='file'></label>
              <input
                type='file'
                id='file'
                className='choose-image'
                accept='.jpg, .jpeg, .png, .gif'
                onChange={(e) => setImageURL(e.target.files[0])}
              />
              <div className='edit-post-btn-bloc'>
                <Button
                  variant='outlined'
                  sx={{
                    margin: '0.5rem'
                  }}
                  className='edit-post-btn'
                  onClick={() => setUploadImage(false)}
                >
                  Annuler
                </Button>
              </div>
            </Box>
          </>
        )}
      </form>
    </div>
  );
}

export default NewPostContent;