import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { deleteAlbum, renameAlbum } from '../../actions/album';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

const AlbumManager = ({
  isCreator,
  albumId,
  name,
  showRenameAlbum,
  toggleShowRenameAlbum,
  deleteAlbum,
  renameAlbum,
}) => {
  const { register, handleSubmit } = useForm();

  const handleRenameAlbum = (formData) => {
    renameAlbum(albumId, formData);
    toggleShowRenameAlbum();
  };

  const handleToggleRenameAlbum = (e) => {
    e.stopPropagation();
    toggleShowRenameAlbum();
  };

  const handleDeleteAlbum = (e) => {
    e.stopPropagation();
    deleteAlbum(albumId);
  };

  return (
    <>
      {showRenameAlbum && (
        <form
          className='space-y-3 my-auto'
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit(handleRenameAlbum)}
        >
          <input
            className='w-full'
            type='text'
            required
            defaultValue={name}
            {...register('name')}
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
            onClick={handleToggleRenameAlbum}
            size='2rem'
            strokeWidth='-1rem'
            className={
              'hover:bg-blue-600 hover:text-white rounded-full transition-colors duration-100 p-0.5 ' +
              (showRenameAlbum ? 'bg-blue-600 text-white' : 'text-blue-600')
            }
          />
          <AiOutlineDelete
            onClick={handleDeleteAlbum}
            size='2rem'
            strokeWidth='-1rem'
            className='hover:bg-blue-600 text-blue-600 hover:text-white rounded-full transition-colors duration-100 p-0.5'
          />
        </div>
      )}
    </>
  );
};

export default connect(null, {
  deleteAlbum,
  renameAlbum,
})(AlbumManager);
