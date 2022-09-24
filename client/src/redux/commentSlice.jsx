import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: "comments",
  initialState: { comments: null },
  reducers: {
    getCommentsData: (state, action) => {
      state.comments = action.payload;
    }
  }
})

export const { getCommentsData } = commentSlice.actions;
export default commentSlice.reducer