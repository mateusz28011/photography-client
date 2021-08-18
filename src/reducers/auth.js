import {
  LOGIN_SUCCESS,
  REGISTER_CLEAR,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  GET_USER_SUCCESS,
} from '../actions/types';

const initialState = {
  user: undefined,
  profile: undefined,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return { ...state, registeredSuccessfully: true };
    case REGISTER_CLEAR:
      delete state.registeredSuccessfully;
      return state;
    case LOGIN_SUCCESS:
      return { ...state, user: payload };
    case LOGOUT_SUCCESS:
      return initialState;
    case GET_USER_SUCCESS:
      return { ...state, user: payload };
    default:
      return state;
  }
};

export default auth;
