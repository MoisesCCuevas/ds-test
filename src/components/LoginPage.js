import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LoginPage = ({ state, dispatch }) => {
  const { initAuth } = useAuth(state, dispatch);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    pass: ''
  });

  useEffect(() => {
    if (!!state.authenticated) navigate('/table');
  }, [state.authenticated, navigate]);

  const onChangeInput = (e, input) => {
    setForm({
      ...form,
      [input]: e.target.value
    })
  }

  const onClickButton = async (e) => {
    e.preventDefault();
    await initAuth(form.name, form.pass);
  }

  return (
    <div className='login'>
      <h1>Inicio de Sesión</h1>
      {state.error !== '' && (
        <span className='error-mess'>{state.error}</span>
      )}
      <form className='login-form'>
        <div className='input-login'>
          <label>Username</label>
          <input onChange={(e) => onChangeInput(e, 'name')} />
        </div>
        <br />
        <div className='input-login'>
          <label>Password</label>
          <input type='password' onChange={(e) => onChangeInput(e, 'pass')} />
        </div>
        <br />
        <button type='submit' onClick={onClickButton}>Ok</button>
      </form>
    </div>
  )
}

export default LoginPage;