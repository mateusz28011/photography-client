export const createErrorMessageSelector = (actions) => (state) => {
  const errors = actions
    .filter((action) => state.error[action])
    .map((action) => state.error[action]);

  if (errors.length !== 0) {
    return errors;
  }
  return '';
};

export const createLoadingSelector = (actions) => (state) =>
  actions.some((action) => state.loading[action]);
