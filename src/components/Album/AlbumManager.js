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

const AlbumManager = ({
  isCreator,
  albumId,
  name,
  showRenameAlbum,
  toggleShowRenameAlbum,
  deleteAlbum,
  renameAlbum,
  addAccessToAlbum,
  removeAccessFromAlbum,
  isInsideAlbum,
  setClickedDeleteToTrue,
}) => {
  const { register, handleSubmit } = useForm();
  const [showAddAccess, setAddAccess] = useState(false);
  const [showRemoveAccess, setRemoveAccess] = useState(false);

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
      {isCreator && (
        <ManagerButtons
          showRename={showRenameAlbum}
          handleToggleRename={handleToggleRenameAlbum}
          deleteFunc={handleDeleteAlbum}
        >
          {isInsideAlbum && (
            <>
              <motion.div
                whileHover={{
                  scale: 1.2,
                }}
              >
                <AiOutlineUserAdd
                  // onClick={deleteFunc}
                  size='2rem'
                  strokeWidth='-1rem'
                  className='text-blue-600  rounded-full transition-colors cursor-pointer duration-100 p-0.5'
                />
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.2,
                }}
              >
                <AiOutlineUserDelete
                  // onClick={deleteFunc}
                  size='2rem'
                  strokeWidth='-1rem'
                  className='text-blue-600  rounded-full transition-colors cursor-pointer duration-100 p-0.5'
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
