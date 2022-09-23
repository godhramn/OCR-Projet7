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

export default commentSlice.reducer