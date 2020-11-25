import React from 'react';
import logo from '../images/header-logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Mesto логотип" className="header__logo" />
      <button className="button" type="button">Войти</button>
    </header>
  );
}

export default Header;
