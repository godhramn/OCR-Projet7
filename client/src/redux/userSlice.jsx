import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: "users",
  initialState: { users: null },
  reducers: {
    getUsersData: (state, action) => {
      state.users = action.payload;
    }
  }
})

export const userSlice = createSlice({
  name: "user",
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

export const { getUserData, updateUserData, getUsersData } = userSlice.actions
export default userSlice.reducer