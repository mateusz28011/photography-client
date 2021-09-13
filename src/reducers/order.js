import { CREATE_ORDER_SUCCESS } from '../actions/types';

const initialState = {
  data: undefined,
};

const order = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ORDER_SUCCESS:
      return { ...state, data: payload };

    default:
      return state;
  }
};

export default order;
