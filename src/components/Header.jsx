import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import logo from '../image/Vector.svg';

function Header() {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Логотип'/>
      <Switch>
        <Route path='/signin'>
          <Link className='header__link' to='/signup'>Регистрация</Link>
        </Route>
        <Route path='/signup'>
          <Link className='header__link' to='/signin'>Войти</Link>
        </Route>
        <Route path='/'>
          <Link className='header__link' to='/signin'>Выйти</Link>
        </Route>
      </Switch>
    </header>
  )
};

export default Header;