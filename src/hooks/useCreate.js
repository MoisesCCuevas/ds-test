import { useState } from 'react';
import { ACTIONS } from '../store/reducer';

const useCreate = (state, dispatch) => {
  const [loading, setLoading] = useState();
  const url = 'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/RegisterUserRole';

  const setNewUser= async (newUser) => {
    const userCreated = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${state.token}`,
      },
      body: JSON.stringify({
        "Body": {
          "Tenant": null,
          "UserName": newUser.user,
          "Password": newUser.pass,
          "Name": newUser.user,
          "FatherLastName": newUser.lastname1,
          "MotherLastName": newUser.lastname2,
          "Email": newUser.email,
          "PhoneNumber": newUser.phone,
          "Metadata": null,
          "Roles": [
            {
              "Id": 2,
              "Name": "Usuario Tradicional"
            }
          ]
        }
      })
    });
    const response = await userCreated.json();
    return response;
  }

  const validate = (newUser) => {
    if (newUser.pass === newUser.passConfirm) return true
    else {
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'El password no es igual' })
      return false
    }
  }

  const onError = (error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error })
    setLoading(false);
  }

  const createUser = async (newUser) => {
    setLoading(true);
    if (validate(newUser)) {
      const userData = await setNewUser(newUser);
      if (!userData.IsOK) onError(userData.Messages);
      setLoading(false);
      return userData.Body
    }
    setLoading(false);
    return false
  }

  return {
    loading,
    createUser
  };
}

export { useCreate };
