import { GET_VENDOR_SUCCESS } from '../actions/types';

const initialState = {
  data: undefined,
};

const vendor = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_VENDOR_SUCCESS:
      return { ...state, data: payload };
    default:
      return state;
  }
};

export default vendor;
