import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_CLEAR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGIN_ERROR_CLEAR,
  REGISTER_ERROR_CLEAR,
  GET_USER_FROM_LOCAL_STORAGE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  EDIT_USER_ERROR_CLEAR,
  LOGIN_FACEBOOK_REQUEST,
  LOGIN_FACEBOOK_SUCCESS,
  LOGIN_FACEBOOK_FAILURE,
  LOGIN_FACEBOOK_ERROR_CLEAR,
} from '../actions/types';

export const registerUser = (userData) => async (dispach) => {
  try {
    dispach({ type: REGISTER_REQUEST });
    await axios.post('/dj-rest-auth/registration/', userData);
    dispach({ type: REGISTER_SUCCESS });
    setTimeout(() => {
      dispach({ type: REGISTER_CLEAR });
    }, 5000);
  } catch (error) {
    dispach({
      type: REGISTER_FAILURE,
      payload: error,
    });
  }
};

export const registerUserClearError = () => async (dispach) => {
  dispach({ type: REGISTER_ERROR_CLEAR });
};

export const loginUser = (userData) => async (dispach) => {
  try {
    dispach({ type: LOGIN_REQUEST });
    const response = await axios.post('/dj-rest-auth/login/', userData);
    const { user } = response.data;
    dispach({ type: LOGIN_SUCCESS, payload: user });
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    dispach({
      type: LOGIN_FAILURE,
      payload: error,
    });
    localStorage.removeItem('user');
  }
};

export const loginUserClearError = () => async (dispach) => {
  dispach({ type: LOGIN_ERROR_CLEAR });
};

export const logoutUser = () => async (dispach) => {
  try {
    dispach({ type: LOGOUT_REQUEST });
    await axios.post('/dj-rest-auth/logout/');
    dispach({ type: LOGOUT_SUCCESS });
    localStorage.removeItem('user');
  } catch (error) {
    dispach({
      type: LOGOUT_FAILURE,
      payload: error,
    });
    localStorage.removeItem('user');
  }
};

export const getUser = () => async (dispach) => {
  try {
    dispach({ type: GET_USER_REQUEST });
    const response = await axios.get('/dj-rest-auth/user/');
    dispach({ type: GET_USER_SUCCESS, payload: response.data });
    localStorage.setItem('user', JSON.stringify(response.data));
  } catch (error) {
    dispach({
      type: GET_USER_FAILURE,
      payload: error,
    });
    localStorage.removeItem('user');
  }
};

export const getUserFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) return { type: GET_USER_FROM_LOCAL_STORAGE, payload: user };
};

export const editUser = (data) => async (dispach) => {
  try {
    dispach({ type: EDIT_USER_REQUEST });
    const response = await axios.patch('/dj-rest-auth/user/', data);
    dispach({ type: EDIT_USER_SUCCESS, payload: response.data });
    localStorage.setItem('user', JSON.stringify(response.data));
  } catch (error) {
    dispach({
      type: EDIT_USER_FAILURE,
      payload: error,
    });
  }
};

export const editUserClearError = () => async (dispach) => {
  dispach({ type: EDIT_USER_ERROR_CLEAR });
};

export const loginFacebook = (data) => async (dispach) => {
  try {
    dispach({ type: LOGIN_FACEBOOK_REQUEST });
    const response = await axios.post('/dj-rest-auth/facebook/', data);
    dispach({ type: LOGIN_FACEBOOK_SUCCESS, payload: response.data.user });
    localStorage.setItem('user', JSON.stringify(response.data.user));
  } catch (error) {
    dispach({
      type: LOGIN_FACEBOOK_FAILURE,
      payload: error,
    });
  }
};

export const loginFacebookClearError = () => async (dispach) => {
  dispach({ type: LOGIN_FACEBOOK_ERROR_CLEAR });
};
