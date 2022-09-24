import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import usersReducer from './usersSlice';
import postReducer from './postSlice';
import commentReducer from'./commentSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    posts: postReducer,
    comments: commentReducer
  }
});