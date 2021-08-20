import { SEARCH_SUCCESS } from '../actions/types';

const initialState = {
  data: undefined,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_SUCCESS:
      return { ...state, data: payload };
    default:
      return state;
  }
};

export default auth;
