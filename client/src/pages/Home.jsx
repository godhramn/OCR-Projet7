import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavbarLeft from '../components/NavbarLeft'
import { Box } from '@mui/material';
import { getPostsData } from '../redux/postSlice'

const Home = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postSlice)

  useEffect(() => {
    if (loadPost) {
      dispatch(getPostsData());
      setLoadPost(false);
    }
  }, [loadPost, dispatch])

  return (
    <>
      <Box
        display="flex"
        flex-direction="column"
        sx={{
          height: "100%"
        }}
      >
        <Box
          sx={{
            width: "10%"
          }}
        >
          <NavbarLeft />
        </Box>
        <Box>
          <ul>
            <li>lol</li>
          </ul>
        </Box>
      </Box>
      
    </>
  );
};

export default Home;