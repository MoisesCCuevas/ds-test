import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useCreate } from '../hooks/useCreate';

const NewUser = ({ state, dispatch }) => {
  const [newUser, setNewUser] = useState();
  const navigate = useNavigate();
  const { createUser, loading } = useCreate(state, dispatch)
  const inputs = [
    { title: 'Nombre', input: 'name', type: 'text' },
    { title: 'Apellido P.', input: 'lastname1', type: 'text' },
    { title: 'Apellido M.', input: 'lastname2', type: 'text' },
    { title: 'Email', input: 'email', type: 'email' },
    { title: 'Telefono', input: 'phone', type: 'text' },
    { title: 'Usuario', input: 'user', type: 'text' },
    { title: 'Password', input: 'pass', type: 'text' },
    { title: 'Password', input: 'passConfirm', type: 'text' },
  ];

  const onChangeInput = (e, input) => {
    setNewUser({
      ...newUser,
      [input]: e.target.value
    });
  }

  const onSaveUser = async (e) => {
    e.preventDefault();
    const res = await createUser(newUser);
    if (!!res) navigate('/table');
  }

  return (
    <div className='new-user'>
      <h1>Nuevo usuario</h1>
      {loading && (
        <span>Cargando...</span>
      )}
      {state.error !== '' && (
        <span className='error-mess'>{state.error}</span>
      )}
      <form className='form-new-user'>
        {inputs.map(({ title, input, type }) => (
          <div className='input-login'>
            <label>{`${title}:`}</label>
            <input required type={type} onChange={(e) => onChangeInput(e, input)} />
          </div>
        ))}
        <button type="submit" onClick={onSaveUser}>Guardar</button>
      </form>
    </div>
  );
}

export default NewUser;
