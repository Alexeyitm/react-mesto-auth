import React from 'react';
import { NavLink } from 'react-router-dom';

function Register() {
  return (
    <div className='auth'>
    <h2 className='auth__title'>Регистрация</h2>
    <form
      //onSubmit={onSubmit}
      className='auth__form'
      name='FormLogin'
      noValidate
    >
      <input
        //onChange={handleChangeName}
        className='auth__input'
        id='email'
        type='email'
        name='Email'
        placeholder='Email'
      />
      <input
        //onChange={handleChangeDescription}
        className='auth__input'
        id='password'
        type='password'
        name='Password'
        placeholder='Пароль'
      />
    <button
      className='auth__button'
      type='submit'
    >Зарегистрироваться</button>
    </form>
    <p className='auth__text'>Уже зарегистрированы? 
      <NavLink className='auth__link' to='/sign-in'> Войти</NavLink>
    </p>
  </div>
  )
};

export default Register;