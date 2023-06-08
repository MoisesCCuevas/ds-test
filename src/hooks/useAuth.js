import { ACTIONS } from '../store/reducer';

const useAuth = (state, dispatch) => {
  const url = 'https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/authentication/authentication';

  const getAuth = async (userName, password) => {
    const userData = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "Body": {
          "Username": userName,
          "Password": password
        }
      })
    });
    const user = await userData.json();
    return user;
  }

  const onError = (error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error })
  }

  const onComplete = (token) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: '' })
    dispatch({ type: ACTIONS.SET_TOKEN, payload: token })
    dispatch({ type: ACTIONS.SET_AUTH, payload: true })
  }

  const initAuth = async (userName, password) => {
    const auth = await getAuth(userName, password);
    if (!auth.IsOK) onError(auth.Messages)
    else onComplete(auth.Body.Token);
    dispatch({ type: ACTIONS.SET_USER, payload: auth })
  }

  return {
    initAuth
  }
}

export default useAuth;
