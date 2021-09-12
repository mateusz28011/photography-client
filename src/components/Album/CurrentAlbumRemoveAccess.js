import React, { useState, useEffect } from 'react';
import {
  removeAccessFromAlbum,
  removeAccessFromAlbumClearError,
} from '../../actions/album';
import { connect } from 'react-redux';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../selectors';
import ApiError from '../ApiError';
import Loading from '../Loading';
import { AiOutlineClose } from 'react-icons/ai';
import { motion } from 'framer-motion';

const CurrentAlbumRemoveAccess = ({
  albumId,
  loading,
  error,
  allowedUsers,
  removeAccessFromAlbum,
  removeAccessFromAlbumClearError,
}) => {
  const [loadingUserId, setLoadingUserId] = useState(undefined);

  useEffect(() => {
    if (loadingUserId !== undefined && loading === false) {
      setLoadingUserId(undefined);
    }
  }, [loading, loadingUserId]);

  return (
    <div className='w-full'>
      <ApiError
        error={error}
        clearFunc={removeAccessFromAlbumClearError}
        center
      />
      {allowedUsers && (
        <div className='self-start px-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 my-4'>
          {allowedUsers.map((user) => (
            <div
              key={user.id}
              className='flex items-center bg-orange-00 py-2 rounded-lg shadow ring-1 ring-gray-600'
            >
              <div className='text-left px-5 break-all'>
                <div className='text-base md:text-lg font-medium'>
                  {user.email}
                </div>
                <div className='text-sm md:text-base'>{`${user.firstName} ${user.lastName}`}</div>
              </div>
              {loading && loadingUserId === user.id ? (
                <div className='ml-auto mr-5'>
                  <Loading size={9} borderWidth={4} />
                </div>
              ) : loading ? null : (
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    x: 2,
                  }}
                  className='ml-auto'
                >
                  <AiOutlineClose
                    onClick={() => {
                      if (!loadingUserId) {
                        removeAccessFromAlbum(albumId, user);
                        error && removeAccessFromAlbumClearError();
                        setLoadingUserId(user.id);
                      }
                    }}
                    className='mr-5 h-9 w-9 cursor-pointer text-red-600'
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const loadingSelector = createLoadingSelector(['REMOVE_ACCESS_FROM_ALBUM']);
const errorSelector = createErrorMessageSelector(['REMOVE_ACCESS_FROM_ALBUM']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  allowedUsers: state.album?.data?.allowedUsers,
  albumId: state.album?.data?.id,
});

export default connect(mapStateToProps, {
  removeAccessFromAlbum,
  removeAccessFromAlbumClearError,
})(CurrentAlbumRemoveAccess);
