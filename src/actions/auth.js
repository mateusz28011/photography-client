import axios from 'axios';
import humps from 'humps';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_CLEAR,
} from '../actions/types';

export const registerUser = (userData) => async (dispach) => {
  try {
    dispach({ type: REGISTER_REQUEST });
    await axios.post('/auth/users/', humps.decamelizeKeys(userData));
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
