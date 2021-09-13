import React from 'react';
import { connect } from 'react-redux';
import {
  uploadImageToAlbumClearError,
  deleteImageFromAlbumClearError,
  createAlbumClearError,
  renameImageFromAlbumClearError,
  deleteAlbumClearError,
  editAlbumClearError,
} from '../../actions/album';
import ApiError from '../ApiError';

const AlbumApiErrors = ({
  errors,
  uploadImageToAlbumClearError,
  deleteImageFromAlbumClearError,
  createAlbumClearError,
  renameImageFromAlbumClearError,
  deleteAlbumClearError,
  editAlbumClearError,
}) => {
  return (
    <div>
      {errors.uploadImageToAlbum && (
        <ApiError
          error={errors.uploadImageToAlbum}
          center
          clearFunc={uploadImageToAlbumClearError}
        />
      )}
      {errors.createAlbum && (
        <ApiError
          error={errors.createAlbum}
          center
          clearFunc={createAlbumClearError}
        />
      )}
      {errors.deleteImageFromAlbum && (
        <ApiError
          error={errors.deleteImageFromAlbum}
          center
          clearFunc={deleteImageFromAlbumClearError}
        />
      )}
      {errors.renameImageFromAlbum && (
        <ApiError
          error={errors.renameImageFromAlbum}
          center
          clearFunc={renameImageFromAlbumClearError}
        />
      )}
      {errors.deleteAlbum && (
        <ApiError
          error={errors.deleteAlbum}
          center
          clearFunc={deleteAlbumClearError}
        />
      )}
      {errors.editAlbum && (
        <ApiError
          error={errors.editAlbum}
          center
          clearFunc={editAlbumClearError}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  errors: {
    uploadImageToAlbum: state.error?.UPLOAD_IMAGE_TO_ALBUM,
    createAlbum: state.error?.CREATE_ALBUM,
    deleteImageFromAlbum: state.error?.DELETE_IMAGE_FROM_ALBUM,
    renameImageFromAlbum: state.error?.RENAME_IMAGE_FROM_ALBUM,
    deleteAlbum: state.error?.DELETE_ALBUM,
    editAlbum: state.error?.EDIT_ALBUM,
  },
});

export default connect(mapStateToProps, {
  uploadImageToAlbumClearError,
  deleteImageFromAlbumClearError,
  createAlbumClearError,
  renameImageFromAlbumClearError,
  deleteAlbumClearError,
  editAlbumClearError,
})(AlbumApiErrors);
