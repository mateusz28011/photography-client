import React, { useState } from 'react';
import {
  deleteAlbum,
  renameAlbum,
  addAccessToAlbum,
  removeAccessFromAlbum,
} from '../../actions/album';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import ManagerButtons from './ManagerButtons';
import { motion } from 'framer-motion';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import CurrentAlbumAddAccess from './CurrentAlbumAddAccess';
import CurrentAlbumRemoveAccess from './CurrentAlbumRemoveAccess';

const AlbumManager = ({
  isCreator,
  albumId,
  name,
  showRenameAlbum,
  toggleShowRenameAlbum,
  deleteAlbum,
  renameAlbum,
  isInsideAlbum,
  setClickedDeleteToTrue,
}) => {
  const { register, handleSubmit } = useForm();
  const [showAddAccess, setShowAddAccess] = useState(false);
  const [showRemoveAccess, setShowRemoveAccess] = useState(false);

  const toggleShowAddAccess = () => {
    showRemoveAccess && toggleShowRemoveAccess();
    showRenameAlbum && toggleShowRenameAlbum();
    setShowAddAccess((prev) => !prev);
  };

  const toggleShowRemoveAccess = () => {
    showAddAccess && toggleShowAddAccess();
    showRenameAlbum && toggleShowRenameAlbum();
    setShowRemoveAccess((prev) => !prev);
  };

  const handleRenameAlbum = (formData) => {
    renameAlbum(albumId, formData);
    toggleShowRenameAlbum();
  };

  const handleToggleRenameAlbum = (e) => {
    e.stopPropagation();
    showAddAccess && toggleShowAddAccess();
    showRemoveAccess && toggleShowRemoveAccess();
    toggleShowRenameAlbum();
  };

  const handleDeleteAlbum = (e) => {
    e.stopPropagation();
    setClickedDeleteToTrue();
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
      {showAddAccess && <CurrentAlbumAddAccess />}
      {showRemoveAccess && <CurrentAlbumRemoveAccess />}
      {isCreator && (
        <ManagerButtons
          showRename={showRenameAlbum}
          handleToggleRename={handleToggleRenameAlbum}
          handleDeleteAlbum={handleDeleteAlbum}
        >
          {isInsideAlbum && (
            <>
              <motion.div
                whileHover={{
                  scale: 1.2,
                }}
              >
                <AiOutlineUserAdd
                  onClick={toggleShowAddAccess}
                  size='2rem'
                  strokeWidth='-1rem'
                  className={
                    'rounded-full transition-colors cursor-pointer duration-100 p-0.5 ' +
                    (showAddAccess ? 'bg-blue-600 text-white' : 'text-blue-600')
                  }
                />
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.2,
                }}
              >
                <AiOutlineUserDelete
                  onClick={toggleShowRemoveAccess}
                  size='2rem'
                  strokeWidth='-1rem'
                  className={
                    'rounded-full transition-colors cursor-pointer duration-100 p-0.5 ' +
                    (showRemoveAccess
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-600')
                  }
                />
              </motion.div>
            </>
          )}
        </ManagerButtons>
      )}
    </>
  );
};

export default connect(null, {
  deleteAlbum,
  renameAlbum,
  addAccessToAlbum,
  removeAccessFromAlbum,
})(AlbumManager);
