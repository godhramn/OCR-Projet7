import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import PrivateRoute from './PrivateRoute'

const Index = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          < Route element={<Home />} exact path='/' />
        </Route>
        < Route element={<Profil />} exact path='/profil' />
      </Routes>
    </Router>
  );
};

export default Index;