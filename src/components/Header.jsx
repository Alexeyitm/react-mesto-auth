import { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import logo from '../image/Vector.svg';

function Header({ handleSignOut, userEmail }) {

  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);

  const handleClick = () => {
    setIsOpenBurgerMenu(!isOpenBurgerMenu);
    console.log(isOpenBurgerMenu)
  }

  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Логотип'/>
      <Switch>
        <Route path='/sign-in'>
          <Link
            className='header__link'
            to='/sign-up'
          >Регистрация</Link>
        </Route>
        <Route path='/sign-up'>
          <Link
            className='header__link'
            to='/sign-in'
          >Войти</Link>
        </Route>
        <Route path='/'>
          <p className='header__email'>{userEmail}</p>
          <Link
            className='header__link header__link_sign-out'
            to='/sign-in' 
            onClick={handleSignOut}
          >Выйти</Link>
          <button 
            className={`header__menu ${isOpenBurgerMenu && 'open'}`}
            onClick={handleClick}
          >
            <div className='header__burger'></div>
          </button>
        </Route>
      </Switch>
    </header>
  )
};

export default Header;