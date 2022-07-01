import React from 'react';
import { Link } from 'react-router-dom';

function BurgerMenu({ userEmail, handleSignOut, handleClickBurgerMenu, isOpenBurgerMenu }) {

  const onSignOut = () => {
    handleSignOut();
    handleClickBurgerMenu();
  }

  console.log(userEmail)
  
  return (
    <div className={`burger ${isOpenBurgerMenu && 'burger_opened'}`}>
      <p className='burger__email'>{userEmail}</p>
      <Link
        className='burger__link'
        to='/sign-in'
        onClick={onSignOut}
      >Выйти</Link>
    </div>
  )
};

export default BurgerMenu;