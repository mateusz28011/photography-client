import queryString from 'query-string';

const getQueryParams = (location, parameters) => {
  const parsed = queryString.parse(location.search);
  const params = {};
  parameters.forEach((param) => {
    if (parsed[param]) params[param] = parsed[param];
  });
  return params;
};

export default getQueryParams;
