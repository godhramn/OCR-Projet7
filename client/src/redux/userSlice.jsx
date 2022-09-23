import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "users",
  initialState: { users: null },
  reducers: {
    getUsersData: (state, action) => {
      state.users = action.payload;
    }
  }
})

export default userSlice.reducer