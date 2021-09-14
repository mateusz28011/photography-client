import {
  CREATE_ORDER_SUCCESS,
  GET_ORDER_SUCCESS,
  UPDATE_ORDER_COST_SUCCESS,
  UPDATE_ORDER_STATUS_SUCCESS,
} from '../actions/types';

const initialState = {
  data: undefined,
};

const order = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ORDER_SUCCESS:
      return { ...state, data: payload };
    case UPDATE_ORDER_STATUS_SUCCESS:
      return { ...state, data: { ...state.data, ...payload } };
    case UPDATE_ORDER_COST_SUCCESS:
      return { ...state, data: { ...state.data, ...payload } };
    case GET_ORDER_SUCCESS:
      return { ...state, data: payload };
    default:
      return state;
  }
};

export default order;
