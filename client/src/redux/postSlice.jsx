import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: "posts",
  initialState: { posts: null },
  reducers: {
    getPostsData: (state, action) => {
      state.posts = action.payload;
    },
    createComment: (state, action) => {},
  }
})

export default postSlice.reducer