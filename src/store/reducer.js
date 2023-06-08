export const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_ERROR: 'SET_ERROR',
  SET_TOKEN: 'SET_TOKEN',
  SET_AUTH: 'SET_AUTH'
}

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case ACTIONS.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    case ACTIONS.SET_AUTH:
      return {
        ...state,
        authenticated: action.payload
      }
    default:
      return state;
  }
}