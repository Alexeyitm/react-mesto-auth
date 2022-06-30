import React from 'react';
import { Link } from 'react-router-dom';
import InfoToolPopup from './InfoToolPopup';

function Register() {
  return (
    <div className='auth'>
      {/*<InfoToolPopup isRegistration={true}/>*/}
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
        <Link className='auth__link' to='/signin'> Войти</Link>
      </p>
    </div>
  )
};

export default Register;