import React from 'react';
import Logo from '../assets/logos/icon-black.png';

const Header = () => {
  return (
    <header>
      <img src={Logo} alt="Image contenant le nom de l'entreprise Groupomania" width="80%"/>
    </header>
  );
};

export default Header;