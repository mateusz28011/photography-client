import humps from 'humps';

export const checkAndReturnApiError = (name, apiError) => {
  name = humps.decamelize(name);
  return (
    apiError[name] &&
    apiError[name].map((error, index) => (
      <p className='capitalize-first' key={`${name}-${index}`}>
        {error}
      </p>
    ))
  );
};
