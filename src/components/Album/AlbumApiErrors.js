import React from 'react';
import { connect } from 'react-redux';
import {
  uploadImageToAlbumClearError,
  deleteImageFromAlbumClearError,
  createAlbumClearError,
  renameImageFromAlbumClearError,
} from '../../actions/album';
import ApiError from '../ApiError';

const AlbumApiErrors = ({
  errors,
  uploadImageToAlbumClearError,
  deleteImageFromAlbumClearError,
  createAlbumClearError,
  renameImageFromAlbumClearError,
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  errors: {
    uploadImageToAlbum: state.error?.UPLOAD_IMAGE_TO_ALBUM,
    createAlbum: state.error?.CREATE_ALBUM,
    deleteImageFromAlbum: state.error?.DELETE_IMAGE_FROM_ALBUM,
    renameImageFromAlbum: state.error?.RENAME_IMAGE_FROM_ALBUM,
  },
});

export default connect(mapStateToProps, {
  uploadImageToAlbumClearError,
  deleteImageFromAlbumClearError,
  createAlbumClearError,
  renameImageFromAlbumClearError,
})(AlbumApiErrors);
