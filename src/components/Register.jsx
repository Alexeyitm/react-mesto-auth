import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegistration }) {

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
      <form
        onSubmit={handleSubmit}
        className='auth__form'
        name='FormLogin'
        noValidate
      >
        <input
          onChange={handleChange}
          className='auth__input'
          id='email'
          type='email'
          value={data.email}
          name='email'
          placeholder='Email'
        />
        <input
          onChange={handleChange}
          className='auth__input'
          id='password'
          type='password'
          value={data.password}
          name='password'
          placeholder='Пароль'
        />
      <button
        className='auth__button'
        type='submit'
      >Зарегистрироваться</button>
      </form>
      <p className='auth__text'>
        Уже зарегистрированы? 
        <Link className='auth__link' to='/sign-in'> Войти</Link>
      </p>
    </div>
  )
};

export default Register;