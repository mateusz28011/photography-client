import { GET_NOTES_SUCCESS } from '../actions/types';

const initialState = {
  data: undefined,
};

const order = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTES_SUCCESS:
      return { ...state, data: payload };
    default:
      return state;
  }
};

export default order;
