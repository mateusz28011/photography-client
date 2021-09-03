import React from 'react';
import {
  deleteImageFromAlbum,
  renameImageFromAlbum,
} from '../../actions/album';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import ManagerButtons from './ManagerButtons';

const PhotoManager = ({
  isCreator,
  albumId,
  title,
  showRenameImage,
  toggleShowRenameImage,
  imageId,
  deleteImageFromAlbum,
  renameImageFromAlbum,
}) => {
  const { register, handleSubmit } = useForm();

  const handleRenameImage = (formData) => {
    renameImageFromAlbum(albumId, imageId, formData);
    toggleShowRenameImage();
  };

  const handleToggleRenameImage = (e) => {
    e.stopPropagation();
    toggleShowRenameImage();
  };

  const handleDeleteImage = (e) => {
    e.stopPropagation();
    deleteImageFromAlbum(albumId, imageId);
  };

  return (
    <>
      {showRenameImage && (
        <form
          className='space-y-3 my-auto'
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit(handleRenameImage)}
        >
          <input
            className='w-full'
            type='text'
            required
            defaultValue={title}
            {...register('title')}
          />
          <input
            className='w-full btn-basic py-2 px-3'
            type='submit'
            value='Confirm'
          />
        </form>
      )}
      {isCreator && (
        <ManagerButtons
          showRename={showRenameImage}
          handleToggleRename={handleToggleRenameImage}
          deleteFunc={handleDeleteImage}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  albumId: state.album.data.id,
});

export default connect(mapStateToProps, {
  deleteImageFromAlbum,
  renameImageFromAlbum,
})(PhotoManager);
