import React from 'react';
import { connect } from 'react-redux';
import {
  uploadImageToAlbumClearError,
  deleteImageFromAlbumClearError,
  createAlbumClearError,
} from '../../actions/album';
import ApiError from '../ApiError';

const AlbumApiErrors = ({
  errors,
  uploadImageToAlbumClearError,
  deleteImageFromAlbumClearError,
  createAlbumClearError,
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  errors: {
    uploadImageToAlbum: state.error?.UPLOAD_IMAGE_TO_ALBUM,
    createAlbum: state.error?.CREATE_ALBUM,
    deleteImageFromAlbum: state.error?.DELETE_IMAGE_FROM_ALBUM,
  },
});

export default connect(mapStateToProps, {
  uploadImageToAlbumClearError,
  deleteImageFromAlbumClearError,
  createAlbumClearError,
})(AlbumApiErrors);
