import React from 'react';
import { useState } from 'react';

function Login({ onLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(email, password);
  }

  return (
    <section className='auth'>
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__input" 
          type="email" 
          value={email} 
          onChange={handleChangeEmail} 
          name="inputEmailAuth" 
          id="emailAuth" 
          placeholder="Email" 
          required />
        <input className="auth__input" 
          type="password" 
          value={password} 
          onChange={handleChangePassword} 
          name="inputPasswordAuth" 
          id="passwordAuth" 
          placeholder="Пароль" 
          required />
        <button className="auth__button" type="submit" aria-label="Войти">Войти</button>
      </form>
    </section>
  );
}

export default Login;
