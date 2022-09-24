import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';

const Index = () => {
  return (
    <Router>
      <Routes>
        < Route element={<Home />} exact path='/' /> 
        < Route element={<Profil />} exact path='/profil' />
      </Routes>
    </Router>
  );
};

export default Index;