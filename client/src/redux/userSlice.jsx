import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    getUserData: (state, action) => {
      state.user = action.payload;
    },
    updateUserData: (state, action) => {},
  },
});

export const { getUserData, updateUserData } = userSlice.actions
export default userSlice.reducer