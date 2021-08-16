import { REGISTER_CLEAR, REGISTER_SUCCESS } from '../actions/types';
const auth = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return { ...state, registeredSuccessfully: true };
    case REGISTER_CLEAR:
      delete state.registeredSuccessfully;
      return state;
    default:
      return state;
  }
};

export default auth;
