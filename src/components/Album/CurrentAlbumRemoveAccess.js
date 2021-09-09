import React, { useRef, useEffect } from 'react';
import {
  removeAccessFromAlbum,
  removeAccessFromAlbumClearError,
} from '../../actions/album';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import { connect } from 'react-redux';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../selectors';
import ApiError from '../ApiError';
import Loading from '../Loading';

const CurrentAlbumRemoveAccess = ({
  albumId,
  loading,
  error,
  allowedUsers,
  removeAccessFromAlbum,
  removeAccessFromAlbumClearError,
}) => {
  return (
    allowedUsers && (
      <div className='self-start px-3'>
        {allowedUsers.map((user) => (
          <div key={user.id} className='flex'>
            <div>{user.email}</div>
            <div
              onClick={() => {
                removeAccessFromAlbum(albumId, user);
                error && removeAccessFromAlbumClearError();
              }}
              className='ml-2'
            >
              remove
            </div>
          </div>
        ))}
      </div>
    )
  );
};

const loadingSelector = createLoadingSelector(['REMOVE_ACCESS_TO_ALBUM']);
const errorSelector = createErrorMessageSelector(['REMOVE_ACCESS_TO_ALBUM']);

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
