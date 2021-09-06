import { SEARCH_CREATE_ALBUM_SUCCESS, SEARCH_SUCCESS } from '../actions/types';

const initialState = {
  data: undefined,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_SUCCESS:
      return { ...state, ...payload };
    case SEARCH_CREATE_ALBUM_SUCCESS:
      const albums = state?.albums?.results;
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
