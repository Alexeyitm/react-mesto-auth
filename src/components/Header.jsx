import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import logo from '../image/Vector.svg';

function Header({ handleSignOut, userEmail }) {

  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Логотип'/>
      <Switch>
        <Route path='/sign-in'>
          <Link className='header__link' to='/sign-up'>Регистрация</Link>
        </Route>
        <Route path='/sign-up'>
          <Link className='header__link' to='/sign-in'>Войти</Link>
        </Route>
        <Route path='/'>
          <p className='header__email'>{userEmail}</p>
          <Link className='header__link' to='/sign-in' onClick={handleSignOut}>Выйти</Link>
        </Route>
      </Switch>
    </header>
  )
};

export default Header;