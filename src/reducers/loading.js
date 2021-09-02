const loading = (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  if (
    ['DELETE_IMAGE_FROM_ALBUM', 'RENAME_IMAGE_FROM_ALBUM'].indexOf(
      requestName
    ) >= 0
  ) {
    const imageId = action.payload?.imageId ?? action.payload;
    return {
      ...state,
      [requestName]: { [imageId]: requestState === 'REQUEST' },
    };
  } else if (['DELETE_ALBUM', 'RENAME_ALBUM'].indexOf(requestName) >= 0) {
    const albumId = action.payload?.albumId ?? action.payload;
    return {
      ...state,
      [requestName]: { [albumId]: requestState === 'REQUEST' },
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
