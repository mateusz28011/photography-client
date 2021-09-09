import {
  SEARCH_CREATE_ALBUM_DATA_CLEAR,
  SEARCH_CREATE_ALBUM_SUCCESS,
  SEARCH_SUCCESS,
  SEARCH_USERS_SUCCESS,
} from '../actions/types';

const initialState = {
  data: undefined,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_SUCCESS:
      return { ...state, ...payload };
    case SEARCH_USERS_SUCCESS:
      return { ...state, ...payload };
    case SEARCH_CREATE_ALBUM_DATA_CLEAR:
      return { ...state, users: null };
    case SEARCH_CREATE_ALBUM_SUCCESS:
      let albums = state?.albums?.results;
      if (albums) {
        albums.unshift(payload);
      } else {
        albums = [payload];
      }
      return { ...state, albums: { ...state?.albums, results: albums } };
    default:
      return state;
  }
};

export default auth;
