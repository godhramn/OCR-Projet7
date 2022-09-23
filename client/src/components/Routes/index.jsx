import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import PrivateRoute from "./PrivateRoutes";

const index = () => {
  return (
    <Router>
      <Routes>
        < Route element={<Home />} exact path='/' />
        < Route element={<Profil />} exact path='/profil' />
      </Routes>
    </Router>
  );
};

export default index;