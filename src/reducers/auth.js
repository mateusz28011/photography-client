import {
  LOGIN_SUCCESS,
  REGISTER_CLEAR,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_FROM_LOCAL_STORAGE,
  EDIT_USER_SUCCESS,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_GOOGLE_SUCCESS,
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
    case LOGIN_FACEBOOK_SUCCESS:
      return { ...state, user: payload };
    case LOGIN_GOOGLE_SUCCESS:
      return { ...state, user: payload };
    case GET_USER_FROM_LOCAL_STORAGE:
      return { ...state, user: payload };
    case EDIT_USER_SUCCESS:
      return { ...state, user: payload };
    default:
      return state;
  }
};

export default auth;
