import { useState } from 'react';

function Login() {

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
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
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
          placeholder='Email'
        />
        <input
          onChange={handleChange}
          className='auth__input'
          id='password'
          type='password'
          name='password'
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