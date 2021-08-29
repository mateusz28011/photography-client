import axios from 'axios';
import {
  GET_ALBUM_REQUEST,
  GET_ALBUM_SUCCESS,
  GET_ALBUM_FAILURE,
  UPLOAD_IMAGE_TO_ALBUM_REQUEST,
  UPLOAD_IMAGE_TO_ALBUM_SUCCESS,
  UPLOAD_IMAGE_TO_ALBUM_FAILURE,
  UPLOAD_IMAGE_TO_ALBUM_ERROR_CLEAR,
  CREATE_ALBUM_REQUEST,
  CREATE_ALBUM_SUCCESS,
  CREATE_ALBUM_FAILURE,
  CREATE_ALBUM_ERROR_CLEAR,
} from '../actions/types';

export const getAlbum = (albumId) => async (dispach) => {
  try {
    dispach({ type: GET_ALBUM_REQUEST });
    const response = await axios.get(`/albums/${albumId}/`);
    dispach({ type: GET_ALBUM_SUCCESS, payload: response.data });
  } catch (error) {
    dispach({
      type: GET_ALBUM_FAILURE,
      payload: error,
    });
  }
};

export const uploadImageToAlbum = (albumId, image) => async (dispach) => {
  try {
    dispach({ type: UPLOAD_IMAGE_TO_ALBUM_REQUEST });
    const formData = new FormData();
    formData.append('image', image);
    const response = await axios.post(`/albums/${albumId}/images/`, formData);
    dispach({ type: UPLOAD_IMAGE_TO_ALBUM_SUCCESS, payload: response.data });
  } catch (error) {
    dispach({
      type: UPLOAD_IMAGE_TO_ALBUM_FAILURE,
      payload: error,
    });
  }
};

export const uploadImageToAlbumClearError = () => async (dispach) => {
  dispach({ type: UPLOAD_IMAGE_TO_ALBUM_ERROR_CLEAR });
};

export const createAlbum = (formData, parentAlbum) => async (dispach) => {
  try {
    dispach({ type: CREATE_ALBUM_REQUEST });
    if (parentAlbum) formData.parentAlbum = parentAlbum;
    const response = await axios.post('/albums/', formData);
    dispach({ type: CREATE_ALBUM_SUCCESS, payload: response.data });
  } catch (error) {
    dispach({
      type: CREATE_ALBUM_FAILURE,
      payload: error,
    });
  }
};

export const createAlbumClearError = () => async (dispach) => {
  dispach({ type: CREATE_ALBUM_ERROR_CLEAR });
};
