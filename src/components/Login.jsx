import { useState } from 'react';

function Login({ handleAuthorization, setIsUserEmail }) {

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    });
    setIsUserEmail(data.email);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleAuthorization(data)
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Вход</h2>
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
          name='email'
          value={data.email}
          placeholder='Email'
        />
        <input
          onChange={handleChange}
          className='auth__input'
          id='password'
          type='password'
          name='password'
          value={data.password}
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