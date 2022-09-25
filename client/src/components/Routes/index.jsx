import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import { UidContext } from '../AppContext';

const Index = () => {
  const uid = useContext(UidContext);
  return (
    <Router>
      <Routes>
        < Route element={<Home />} exact path='/' />
        < Route element={<Profil />} exact path='/profil/:id' />
        < Route element={<Navigate replace to={`/profil/${uid}`} />} path='/profil' />
      </Routes>
    </Router>
  );
};

export default Index;