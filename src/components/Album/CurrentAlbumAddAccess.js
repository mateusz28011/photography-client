import React, { useRef, useEffect, useState } from 'react';
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
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { motion } from 'framer-motion';
import NavigationNextPrevious from './../pages/Search/NavigationNextPrevious';

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
  const [loadingUserId, setLoadingUserId] = useState(undefined);

  useEffect(() => {
    if (loadingUserId !== undefined && loadingAddAccessToAlbum === false) {
      setLoadingUserId(undefined);
    }
  }, [loadingAddAccessToAlbum, loadingUserId]);

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
          {data && data.results.length !== 0 ? (
            <>
              <div className='self-start px-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 my-4'>
                {data.results.map((user) => (
                  <div
                    key={user.id}
                    className='flex items-center bg-orange-00 py-2 rounded-lg shadow ring-1 ring-blue-600'
                  >
                    <div className='text-left px-5 break-all'>
                      <div className='text-base md:text-lg font-medium'>
                        {user.email}
                      </div>
                      <div className='text-sm md:text-base'>{`${user.firstName} ${user.lastName}`}</div>
                    </div>
                    {isInAllowedUsers(user) ? (
                      <AiOutlineCheck className='ml-auto mr-5 text-green-500 h-9 w-9' />
                    ) : loadingAddAccessToAlbum && loadingUserId === user.id ? (
                      <div className='ml-auto mr-5'>
                        <Loading size={9} borderWidth={4} />
                      </div>
                    ) : loadingAddAccessToAlbum ? null : (
                      <motion.div
                        whileHover={{
                          scale: 1.2,
                          x: 2,
                        }}
                        className='ml-auto'
                      >
                        <AiOutlinePlus
                          onClick={() => {
                            if (!loadingUserId) {
                              addAccessToAlbum(albumId, user);
                              errorAddAccessToAlbum &&
                                addAccessToAlbumClearError();
                              setLoadingUserId(user.id);
                            }
                          }}
                          className='mr-5 h-9 w-9 cursor-pointer text-blue-600'
                        />
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
              <div className='px-4 mb-2 mt-5'>
                <NavigationNextPrevious
                  className=' bg-orange-00 ring-1 ring-blue-600'
                  previous={data.previous}
                  next={data.next}
                  searchFunc={searchUsers}
                />
              </div>
            </>
          ) : (
            <div className='w-full my-5 text-xl font-medium tracking-wide'>
              Nothing was found
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
