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
  DELETE_IMAGE_FROM_ALBUM_REQUEST,
  DELETE_IMAGE_FROM_ALBUM_SUCCESS,
  DELETE_IMAGE_FROM_ALBUM_FAILURE,
  DELETE_IMAGE_FROM_ALBUM_ERROR_CLEAR,
  RENAME_IMAGE_FROM_ALBUM_REQUEST,
  RENAME_IMAGE_FROM_ALBUM_SUCCESS,
  RENAME_IMAGE_FROM_ALBUM_FAILURE,
  RENAME_IMAGE_FROM_ALBUM_ERROR_CLEAR,
  DELETE_ALBUM_REQUEST,
  DELETE_ALBUM_SUCCESS,
  DELETE_ALBUM_FAILURE,
  DELETE_ALBUM_ERROR_CLEAR,
  RENAME_ALBUM_REQUEST,
  RENAME_ALBUM_SUCCESS,
  RENAME_ALBUM_FAILURE,
  RENAME_ALBUM_ERROR_CLEAR,
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

export const deleteAlbum = (albumId) => async (dispach) => {
  try {
    dispach({ type: DELETE_ALBUM_REQUEST, payload: albumId });
    await axios.delete(`/albums/${albumId}/`);
    dispach({ type: DELETE_ALBUM_SUCCESS, payload: albumId });
  } catch (error) {
    dispach({
      type: DELETE_ALBUM_FAILURE,
      payload: { error, albumId },
    });
  }
};

export const deleteAlbumClearError = () => async (dispach) => {
  dispach({ type: DELETE_ALBUM_ERROR_CLEAR });
};

export const renameAlbum = (albumId, formData) => async (dispach) => {
  try {
    dispach({ type: RENAME_ALBUM_REQUEST, payload: albumId });
    await axios.patch(`/albums/${albumId}/`, formData);
    dispach({
      type: RENAME_ALBUM_SUCCESS,
      payload: { albumId, name: formData.name },
    });
  } catch (error) {
    dispach({
      type: RENAME_ALBUM_FAILURE,
      payload: { error, albumId },
    });
  }
};

export const renameAlbumClearError = () => async (dispach) => {
  dispach({ type: RENAME_ALBUM_ERROR_CLEAR });
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

export const deleteImageFromAlbum = (albumId, imageId) => async (dispach) => {
  try {
    dispach({ type: DELETE_IMAGE_FROM_ALBUM_REQUEST, payload: imageId });
    await axios.delete(`/albums/${albumId}/images/${imageId}/`);
    dispach({ type: DELETE_IMAGE_FROM_ALBUM_SUCCESS, payload: imageId });
  } catch (error) {
    dispach({
      type: DELETE_IMAGE_FROM_ALBUM_FAILURE,
      payload: { error, imageId },
    });
  }
};

export const deleteImageFromAlbumClearError = () => async (dispach) => {
  dispach({ type: DELETE_IMAGE_FROM_ALBUM_ERROR_CLEAR });
};

export const renameImageFromAlbum =
  (albumId, imageId, formData) => async (dispach) => {
    try {
      dispach({ type: RENAME_IMAGE_FROM_ALBUM_REQUEST, payload: imageId });
      await axios.patch(`/albums/${albumId}/images/${imageId}/`, formData);
      dispach({
        type: RENAME_IMAGE_FROM_ALBUM_SUCCESS,
        payload: { imageId, title: formData.title },
      });
    } catch (error) {
      dispach({
        type: RENAME_IMAGE_FROM_ALBUM_FAILURE,
        payload: { error, imageId },
      });
    }
  };

export const renameImageFromAlbumClearError = () => async (dispach) => {
  dispach({ type: RENAME_IMAGE_FROM_ALBUM_ERROR_CLEAR });
};
