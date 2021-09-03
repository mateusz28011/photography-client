import React from 'react';
import { deleteAlbum, renameAlbum } from '../../actions/album';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import ManagerButtons from './ManagerButtons';

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
        <ManagerButtons
          showRename={showRenameAlbum}
          handleToggleRename={handleToggleRenameAlbum}
          deleteFunc={handleDeleteAlbum}
        />
      )}
    </>
  );
};

export default connect(null, {
  deleteAlbum,
  renameAlbum,
})(AlbumManager);
