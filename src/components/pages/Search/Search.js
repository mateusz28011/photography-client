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
import ApiError from '../../ApiError';

const Search = ({ loading, error, data, searchProfiles }) => {
  const location = useLocation();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmitSearch = ({ search }) => {
    const parsed = queryString.parse(location.search);
    parsed.page = undefined;
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

  const showVendor = ({ id }) => {
    history.push(`/vendor/${id}`);
  };

  useEffect(() => {
    console.log('fetch vendors');
    searchProfiles(location.search);
  }, [searchProfiles, location]);

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
      ) : error ? (
        <ApiError error={error} />
      ) : (
        <div>
          {data &&
            data.results.map((result, index) => (
              <div
                onClick={() => {
                  showVendor(result);
                }}
                key={index}
              >
                {result.name}
              </div>
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
