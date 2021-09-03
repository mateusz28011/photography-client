import {
  GET_ALBUM_SUCCESS,
  CREATE_ALBUM_SUCCESS,
  UPLOAD_IMAGE_TO_ALBUM_SUCCESS,
  DELETE_IMAGE_FROM_ALBUM_SUCCESS,
  RENAME_IMAGE_FROM_ALBUM_SUCCESS,
  DELETE_ALBUM_SUCCESS,
  RENAME_ALBUM_SUCCESS,
} from '../actions/types';

const initialState = {
  data: undefined,
};

const album = (state = initialState, action) => {
  const { type, payload } = action;
  let childAlbums;
  switch (type) {
    case GET_ALBUM_SUCCESS:
      return { ...state, data: payload };
    case CREATE_ALBUM_SUCCESS:
      childAlbums = state.data.childAlbums;
      if (childAlbums) {
        childAlbums.unshift(payload);
      } else {
        childAlbums = [payload];
      }
      return { ...state, data: { ...state.data, childAlbums: childAlbums } };
    case DELETE_ALBUM_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          childAlbums: state.data.childAlbums.filter(
            (album) => album.id !== payload
          ),
        },
      };
    case RENAME_ALBUM_SUCCESS:
      let isChanged = false;
      childAlbums = state.data.childAlbums.map((album) => {
        if (album.id === payload.albumId) {
          album.name = payload.name;
          isChanged = true;
        }
        return album;
      });

      if (isChanged) {
        return {
          ...state,
          data: {
            ...state.data,
            childAlbums: childAlbums,
          },
        };
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            name: payload.name,
          },
        };
      }

    case UPLOAD_IMAGE_TO_ALBUM_SUCCESS:
      let images = state.data.images;
      if (images) {
        images.unshift(payload);
      } else {
        images = [payload];
      }
      return { ...state, data: { ...state.data, images: images } };
    case DELETE_IMAGE_FROM_ALBUM_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          images: state.data.images.filter((image) => image.id !== payload),
        },
      };
    case RENAME_IMAGE_FROM_ALBUM_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          images: state.data.images.map((image) => {
            if (image.id === payload.imageId) image.title = payload.title;
            return image;
          }),
        },
      };
    default:
      return state;
  }
};

export default album;
