import axios from 'axios';
import {
  GET_NOTES_FAILURE,
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
} from './types';

export const getNotes = (orderId, query) => async (dispach) => {
  try {
    dispach({ type: GET_NOTES_REQUEST });

    const response = await axios.get(
      `/orders/${orderId}/notes/${query ? query : ''}`
    );
    dispach({ type: GET_NOTES_SUCCESS, payload: response.data });
  } catch (error) {
    dispach({
      type: GET_NOTES_FAILURE,
      payload: error,
    });
  }
};
