import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <div className="header__auth">
          <p className="header__text">{props.email}</p>
          <Link to={props.route} className="header__link" onClick={props.onClick}>{props.title}</Link>
        </div>
      </header>
  );
}

export default Header;
