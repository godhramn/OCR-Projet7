import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: { users: null },
  reducers: {
    getUsersData: (state, action) => {
      state.users = action.payload;
    }
  }
})

export const { getUsersData } = usersSlice.actions
export default usersSlice.reducer