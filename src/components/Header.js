import React from "react";
import logo from "../images/header-logo.svg";
import { Link } from "react-router-dom";

function Header({ button }) {
  return (
    <header className="header">
      <img src={logo} alt="Mesto логотип" className="header__logo" />
      {button === "login" && (
        <Link to="/sign-in" className="header__link link">
          Войти
        </Link>
      )}
      {button === "register" && (
        <Link to="/sign-up" className="header__link link">
          Регистрация
        </Link>
      )}
      {button === "isLogged" && (
        <div className="header__text-container">
          <span className="header__name">email@mail.com</span>
          <Link
            to="/sign-up"
            className="header__link header__link_type_logout link"
          >
            Выйти
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
