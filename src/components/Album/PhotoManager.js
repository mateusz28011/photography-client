import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import {
  deleteImageFromAlbum,
  renameImageFromAlbum,
} from '../../actions/album';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

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
          className='space-y-3 mb-4 mt-2'
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
        <div className='flex space-x-2 mt-2'>
          <AiOutlineEdit
            onClick={handleToggleRenameImage}
            size='2rem'
            strokeWidth='-1rem'
            className={
              'hover:bg-blue-600 hover:text-white rounded-full transition-colors duration-100 p-0.5 ' +
              (showRenameImage ? 'bg-blue-600 text-white' : 'text-blue-600')
            }
          />
          <AiOutlineDelete
            onClick={handleDeleteImage}
            size='2rem'
            strokeWidth='-1rem'
            className='hover:bg-blue-600 text-blue-600 hover:text-white rounded-full transition-colors duration-100 p-0.5'
          />
        </div>
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
