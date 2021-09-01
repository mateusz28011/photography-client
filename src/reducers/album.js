import {
  GET_ALBUM_SUCCESS,
  CREATE_ALBUM_SUCCESS,
  UPLOAD_IMAGE_TO_ALBUM_SUCCESS,
  DELETE_IMAGE_FROM_ALBUM_SUCCESS,
} from '../actions/types';

const initialState = {
  data: undefined,
};

const album = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALBUM_SUCCESS:
      return { ...state, data: payload };
    case CREATE_ALBUM_SUCCESS:
      let childAlbums = state.data.childAlbums;
      if (childAlbums) {
        childAlbums.unshift(payload);
      } else {
        childAlbums = [payload];
      }
      state.data.childAlbums = childAlbums;
      return state;
    case UPLOAD_IMAGE_TO_ALBUM_SUCCESS:
      let images = state.data.images;
      if (images) {
        images.unshift(payload);
      } else {
        images = [payload];
      }
      state.data.images = images;
      return state;
    case DELETE_IMAGE_FROM_ALBUM_SUCCESS:
      state.data.images = state.data.images.filter(
        (image) => image.id !== payload
      );
      return state;
    default:
      return state;
  }
};

export default album;
