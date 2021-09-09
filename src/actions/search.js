import axios from 'axios';
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SEARCH_CREATE_ALBUM_REQUEST,
  SEARCH_CREATE_ALBUM_SUCCESS,
  SEARCH_CREATE_ALBUM_FAILURE,
  SEARCH_CREATE_ALBUM_ERROR_CLEAR,
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE,
  SEARCH_CREATE_ALBUM_DATA_CLEAR,
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

export const searchCreateAlbum = (formData) => async (dispach) => {
  try {
    dispach({ type: SEARCH_CREATE_ALBUM_REQUEST });
    const response = await axios.post('/albums/', formData);
    dispach({ type: SEARCH_CREATE_ALBUM_SUCCESS, payload: response.data });
  } catch (error) {
    dispach({
      type: SEARCH_CREATE_ALBUM_FAILURE,
      payload: error,
    });
  }
};

export const searchCreateAlbumClearError = () => async (dispach) => {
  dispach({ type: SEARCH_CREATE_ALBUM_ERROR_CLEAR });
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

export const searchUsers = (query) => async (dispach) => {
  try {
    dispach({ type: SEARCH_USERS_REQUEST });
    const response = await axios.get(`/users/${query}`);
    dispach({ type: SEARCH_USERS_SUCCESS, payload: { users: response.data } });
  } catch (error) {
    dispach({
      type: SEARCH_USERS_FAILURE,
      payload: error,
    });
  }
};

export const searchUsersClearError = () => async (dispach) => {
  dispach({ type: SEARCH_CREATE_ALBUM_ERROR_CLEAR });
};

export const searchUsersClearData = () => async (dispach) => {
  dispach({ type: SEARCH_CREATE_ALBUM_DATA_CLEAR });
};
