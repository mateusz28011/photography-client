const loading = (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  if (requestName === 'DELETE_IMAGE_FROM_ALBUM') {
    const imageID = action.payload?.imageId ?? action.payload;
    return {
      ...state,
      [requestName]: { [imageID]: requestState === 'REQUEST' },
    };
  } else {
    return {
      ...state,
      // Store whether a request is happening at the moment or not
      // e.g. will be true when receiving GET_TODOS_REQUEST
      //      and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
      [requestName]: requestState === 'REQUEST',
    };
  }
};

export default loading;
