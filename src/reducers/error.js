export const error = (state = {}, action) => {
  const { type, payload } = action;
  const matches = /(.*)_(REQUEST|FAILURE|ERROR_CLEAR)/.exec(type);

  // not a *_REQUEST / *_FAILURE / *_CLEAR actions, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  if (requestState === 'ERROR_CLEAR') {
    return {
      ...state,
      [requestName]: '',
    };
  } else {
    return {
      ...state,
      // Store errorMessage
      // e.g. stores errorMessage when receiving GET_TODOS_FAILURE
      //      else clear errorMessage when receiving GET_TODOS_REQUEST
      [requestName]:
        requestState === 'FAILURE'
          ? payload?.response?.data ?? payload?.message
          : '',
    };
  }
};

export default error;
