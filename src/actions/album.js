import axios from 'axios';
import {
  GET_ALBUM_REQUEST,
  GET_ALBUM_SUCCESS,
  GET_ALBUM_FAILURE,
  UPLOAD_IMAGE_TO_ALBUM_REQUEST,
  UPLOAD_IMAGE_TO_ALBUM_SUCCESS,
  UPLOAD_IMAGE_TO_ALBUM_FAILURE,
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
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    await axios.post(`/albums/${albumId}/images/`, formData, config);
    dispach({ type: UPLOAD_IMAGE_TO_ALBUM_SUCCESS });
  } catch (error) {
    dispach({
      type: UPLOAD_IMAGE_TO_ALBUM_FAILURE,
      payload: error,
    });
  }
};
