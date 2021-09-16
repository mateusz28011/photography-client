import axios from 'axios';
import {
  CREATE_NOTE_ERROR_CLEAR,
  CREATE_NOTE_FAILURE,
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
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

export const createNote = (orderId, formData) => async (dispach) => {
  try {
    dispach({ type: CREATE_NOTE_REQUEST });
    await axios.post(`/orders/${orderId}/notes/`, formData);
    dispach({ type: CREATE_NOTE_SUCCESS });
  } catch (error) {
    dispach({
      type: CREATE_NOTE_FAILURE,
      payload: error,
    });
  }
};

export const createNoteClearError = () => async (dispach) => {
  dispach({ type: CREATE_NOTE_ERROR_CLEAR });
};
