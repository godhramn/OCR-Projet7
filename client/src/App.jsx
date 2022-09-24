import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import axios from 'axios';

import { UidContext } from './components/AppContext'
import Routes from './components/Routes';
import { getUserData, getUsersData } from "./redux/userSlice";
import { getPostsData } from "./redux/postSlice";
import { getCommentsData } from "./redux/commentSlice";


const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async() => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true
      })
      .then((res) => setUid(res.data))
      .catch((error) => console.log(error))
    }
    fetchToken();

    const getUsers = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/users`,
        withCredentials: true,
      })
      .then((res) => {
        dispatch(getUsersData(res.data));
      })
      .catch((error) => console.log(error));
    }
    getUsers();

    const getUser = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
        withCredentials: true,
      })
      .then((res) => {
        dispatch(getUserData(res.data));
      })
      .catch((error) => console.log(error));
    }
    getUser();

    const getPosts = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/posts`,
        withCredentials: true,
      })
      .then((res) => {
        dispatch(getPostsData(res.data));
      })
      .catch((error) => console.log(error));
    }
    getPosts();

    const getComments = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/comments`,
        withCredentials: true,
      })
      .then((res) => {
        dispatch(getCommentsData(res.data));
      })
      .catch((error) => console.log(error));
    }
    getComments();

  }, [uid, dispatch]);

  
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
