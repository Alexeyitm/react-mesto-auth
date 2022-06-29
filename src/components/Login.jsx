import React from 'react';

function Login() {
  return (
    <div className='auth'>
      <h2 className='auth__title'>Вход</h2>
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
      >Войти</button>
      </form>
    </div>
  )
};

export default Login;