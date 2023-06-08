import { useState } from 'react';
import { ACTIONS } from '../store/reducer';

const useSearch = (dispatch, token) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const url = 'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers';

  const responseData= async (filter) => {
    const userData = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        "Body": {
          "SearchText": filter
        }
      })
    });
    const user = await userData.json();
    return user;
  }

  const onError = (error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error })
  }

  const onComplete = () => {
    setLoading(false);
    dispatch({ type: ACTIONS.SET_ERROR, payload: '' })
  }

  const getData = async (filter) => {
    setLoading(true);
    const userData = await responseData(filter);
    if (!userData.IsOK) onError(userData.Messages)
    else onComplete();
    setData(userData.Body);
  }

  return {
    data,
    loading,
    getData
  }
}

export default useSearch;
