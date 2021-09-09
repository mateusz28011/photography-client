import React, { useRef, useEffect } from 'react';
import {
  addAccessToAlbum,
  addAccessToAlbumClearError,
} from '../../actions/album';
import {
  searchUsers,
  searchUsersClearError,
  searchUsersClearData,
} from '../../actions/search';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import { connect } from 'react-redux';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../selectors';
import ApiError from '../ApiError';
import Loading from '../Loading';

const CurrentAlbumAddAccess = ({
  albumId,
  loading,
  error,
  searchUsers,
  searchUsersClearError,
  searchUsersClearData,
  data,
  allowedUsers,
  addAccessToAlbum,
  addAccessToAlbumClearError,
  loadingAddAccessToAlbum,
  errorAddAccessToAlbum,
}) => {
  const { register, handleSubmit } = useForm();
  const isResult = useRef(false);

  const onSubmitSearch = (data) => {
    error && addAccessToAlbumClearError();
    searchUsers(`?${queryString.stringify(data)}`);
  };

  const isInAllowedUsers = (user) => {
    return allowedUsers.some((allowedUser) =>
      allowedUser.id === user.id ? true : false
    );
  };

  useEffect(() => {
    if (isResult.current === false && data) {
      isResult.current = true;
    }
  }, [data]);

  useEffect(() => {
    return () => {
      if (isResult.current) {
        searchUsersClearData();
        isResult.current = false;
      }
    };
  }, [searchUsersClearData]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitSearch)}
        className='flex flex-col items-center py-5 px-2 ssm:p-5'
      >
        <label
          htmlFor='search'
          className='text-lg mb-2 ssm:mb-0 md:text-xl font-medium text-gray-700 text-center'
        >
          Search in e-mails, first and last names of users
        </label>
        <div className='flex w-full justify-center flex-wrap items-center'>
          <input
            type='search'
            name='search'
            required
            {...register('search')}
            className='mx-2 ssm:w-72 flex-shrink mb-1'
          />
          <input
            type='submit'
            value='Search'
            disabled={loading ? true : false}
            className='btn-basic mx-2 py-1.5 px-5 mt-1 mb-1 w-full ssm:w-auto'
          />
        </div>
      </form>

      {loading ? (
        <Loading className='py-4' />
      ) : error ? (
        <div className='w-full -mt-3'>
          <ApiError error={error} clearFunc={searchUsersClearError} center />
        </div>
      ) : (
        <div className='w-full -mt-3'>
          <ApiError
            error={errorAddAccessToAlbum}
            clearFunc={addAccessToAlbumClearError}
            center
          />
          {data && (
            <div className='self-start px-3'>
              {data.results.map((user) => (
                <div key={user.id} className='flex'>
                  <div>{user.email}</div>
                  {!isInAllowedUsers(user) && (
                    <div
                      onClick={() => {
                        addAccessToAlbum(albumId, user);
                        errorAddAccessToAlbum && addAccessToAlbumClearError();
                      }}
                      className='ml-2'
                    >
                      add
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const loadingSelector = createLoadingSelector(['SEARCH_USERS']);
const loadingAddAccessToAlbumSelector = createLoadingSelector([
  'ADD_ACCESS_TO_ALBUM',
]);

const errorSelector = createErrorMessageSelector(['SEARCH_USERS']);
const errorAddAccessToAlbumSelector = createErrorMessageSelector([
  'ADD_ACCESS_TO_ALBUM',
]);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  loadingAddAccessToAlbum: loadingAddAccessToAlbumSelector(state),
  errorAddAccessToAlbum: errorAddAccessToAlbumSelector(state),
  data: state.search?.users,
  allowedUsers: state.album?.data?.allowedUsers,
  albumId: state.album?.data?.id,
});

export default connect(mapStateToProps, {
  searchUsers,
  searchUsersClearError,
  searchUsersClearData,
  addAccessToAlbum,
  addAccessToAlbumClearError,
})(CurrentAlbumAddAccess);
