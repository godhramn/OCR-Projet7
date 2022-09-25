import React from 'react';
import NewPost from './NewPost';
import PostCard from './postcard/PostCard';
import { Box } from '@mui/material'

function Thread() {
  return (
    <>
      <main>
        <Box
          borderBottom="1px solid black"
          textAlign="center"
          color="white"
          sx={{
            width: "100%",
            marginBottom: "30px"
          }}
        >
          <h1>Publications</h1>
        </Box>
        <Box className='new-post'>
          <section>
            <NewPost />
          </section>
        </Box>

        <Box className='thread'>
          <section>
            <PostCard />
          </section>
        </Box>
      </main>
    </>
  );
}

export default Thread;