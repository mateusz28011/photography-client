import axios from 'axios';
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
} from '../actions/types';

export const searchAlbums = (query) => async (dispach) => {
  try {
    dispach({ type: SEARCH_REQUEST });
    const response = await axios.get(`/albums/${query}`);
    dispach({ type: SEARCH_SUCCESS, payload: { albums: response.data } });
  } catch (error) {
    dispach({
      type: SEARCH_FAILURE,
      payload: error,
    });
  }
};

export const searchProfiles = (query) => async (dispach) => {
  try {
    dispach({ type: SEARCH_REQUEST });
    const response = await axios.get(`/profiles/${query}`);
    dispach({ type: SEARCH_SUCCESS, payload: { profiles: response.data } });
  } catch (error) {
    dispach({
      type: SEARCH_FAILURE,
      payload: error,
    });
  }
};
