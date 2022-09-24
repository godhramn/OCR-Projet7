import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: "posts",
  initialState: { posts: null },
  reducers: {
    getPostsData: (state, action) => {
      state.posts = action.payload;
    },
    createPost: (state, action) => {},
  }
})

export const { getPostsData, createPost } = postSlice.actions;
export default postSlice.reducer