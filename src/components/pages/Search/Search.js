import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { searchProfiles } from '../../../actions/search';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import NavigationNextPrevious from './NavigationNextPrevious';
import queryString from 'query-string';

const Search = ({ loading, error, data, searchProfiles }) => {
  const location = useLocation();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmitSearch = ({ search }) => {
    const parsed = queryString.parse(location.search);
    parsed.search = search ? search : undefined;
    const query = queryString.stringify(parsed);
    history.push(`${location.pathname}?${query}`);
  };

  const onSubmitFilter = ({ ordering }) => {
    const parsed = queryString.parse(location.search);
    parsed.ordering = ordering ? ordering : undefined;
    const query = queryString.stringify(parsed);
    history.push(`${location.pathname}?${query}`);
  };

  useEffect(() => {
    console.log('fetch');
    searchProfiles(location.search);
  }, [searchProfiles, location]);
  console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitSearch)}>
        <input type='search' name='search' {...register('search')} />
        <input type='submit' value='Search' />
      </form>
      <form onSubmit={handleSubmit(onSubmitFilter)}>
        <label htmlFor='ordering'>Ordering</label>
        <select name='ordering' {...register('ordering')}>
          <option></option>
          <option value='name'>name - ascending</option>
          <option value='-name'>name - descending</option>
          <option value='created'>created - ascending</option>
          <option value='-created'>created - descending</option>
        </select>
        <input type='submit' value='Filter' />
      </form>
      {loading ? (
        <p>loading</p>
      ) : (
        <div>
          {data &&
            data.results.map((result, index) => (
              <div key={index}>{result.name}</div>
            ))}
          <NavigationNextPrevious />
        </div>
      )}
    </div>
  );
};

const loadingSelector = createLoadingSelector(['SEARCH']);
const errorSelector = createErrorMessageSelector(['SEARCH']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  data: state.search.data,
});

export default connect(mapStateToProps, { searchProfiles })(Search);
