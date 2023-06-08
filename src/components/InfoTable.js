import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import useSearch from '../hooks/useSearch';

const InfoTable = ({ state, dispatch }) => {
  const [searchValue, setSearch] = useState();
  const navigate = useNavigate();
  const { data, getData, loading } = useSearch(dispatch, state.token);

  const onChangeInput = (e) => {
    setSearch(e.target.value)
  }

  const onClickButton = (e) => {
    e.preventDefault();
    getData(searchValue);
  }

  const onClickNew = (e) => {
    e.preventDefault();
    navigate('/new_user');
  }

  return (
    <div>
      {loading && (
        <span>Buscando...</span>
      )}
      <form className='search-form'>
        <div>
          <input onChange={onChangeInput} />
          <button type='submit' onClick={onClickButton}>Ok</button>
        </div>
        <button type='submit' onClick={onClickNew}>Nuevo</button>
      </form>
      <section>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>FatherLastName</th>
              <th>CreationDate</th>
              <th>Email</th>
              <th>PhoneNumber</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 && data.map((user) => (
              <tr key={user.Id}>
                <td>{user.Username}</td>
                <td>{user.Name}</td>
                <td>{user.FatherLastName}</td>
                <td>{user.CreationDate}</td>
                <td>{user.Email}</td>
                <td>{user.PhoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default InfoTable;