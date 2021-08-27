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
  } catch (error) {
    dispach({
      type: LOGIN_FAILURE,
      payload: error,
    });
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
  } catch (error) {
    dispach({
      type: LOGOUT_FAILURE,
      payload: error,
    });
  }
};

export const getUser = () => async (dispach) => {
  try {
    dispach({ type: GET_USER_REQUEST });
    const response = await axios.get('/dj-rest-auth/user/');
    dispach({ type: GET_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispach({
      type: GET_USER_FAILURE,
      payload: error,
    });
  }
};
