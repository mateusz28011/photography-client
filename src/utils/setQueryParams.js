import queryString from 'query-string';

export default function setQueryParams(history, location, parameters) {
  const parsed = queryString.parse(location.search);
  for (let varName in parameters) {
    parsed[varName] = parameters[varName] || undefined;
  }
  const query = queryString.stringify(parsed);
  history.push(`${location.pathname}?${query}`);
}
