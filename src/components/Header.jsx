import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import logo from '../image/Vector.svg';

function Header({ textLink }) {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Логотип'/>
      <Routes>
        <Route 
          path='/'
          element={<NavLink className='header__link' to='/sign-in'>Выйти</NavLink>}
        />
                <Route 
          path='/sign-in'
          element={<NavLink className='header__link' to='/sign-up'>Регистрация</NavLink>}
        />
                <Route 
          path='/sign-up'
          element={<NavLink className='header__link' to='/sign-in'>Войти</NavLink>}
        />
      </Routes>
    </header>
  )
};

export default Header;