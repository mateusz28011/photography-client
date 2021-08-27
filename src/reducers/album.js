import { GET_ALBUM_SUCCESS } from '../actions/types';

const initialState = {
  data: undefined,
};

const album = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALBUM_SUCCESS:
      return { ...state, data: payload };
    default:
      return state;
  }
};

export default album;
