import React from 'react';
import logo from '../image/Vector.svg';

function Header({ textLink }) {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Логотип'/>
      <a className='header__link'>{textLink}</a>
    </header>
  )
};

export default Header;