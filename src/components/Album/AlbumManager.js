import React, { useState } from 'react';
import {
  deleteAlbum,
  editAlbum,
  addAccessToAlbum,
  removeAccessFromAlbum,
} from '../../actions/album';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import ManagerButtons from './ManagerButtons';
import { motion } from 'framer-motion';
import {
  AiOutlineUserAdd,
  AiOutlineUserDelete,
  AiOutlineShareAlt,
} from 'react-icons/ai';
import CurrentAlbumAddAccess from './CurrentAlbumAddAccess';
import CurrentAlbumRemoveAccess from './CurrentAlbumRemoveAccess';
import CurrentAlbumShare from './CurrentAlbumShare';

const AlbumManager = ({
  isCreator,
  albumId,
  name,
  isPublic,
  showEditAlbum,
  toggleShowEditAlbum,
  deleteAlbum,
  editAlbum,
  isInsideAlbum,
  setClickedDeleteToTrue,
}) => {
  const { register, handleSubmit } = useForm();
  const [showAddAccess, setShowAddAccess] = useState(false);
  const [showRemoveAccess, setShowRemoveAccess] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const toggleShowAddAccess = () => {
    showRemoveAccess && toggleShowRemoveAccess();
    showEditAlbum && toggleShowEditAlbum();
    showShare && toggleShowShare();
    setShowAddAccess((prev) => !prev);
  };

  const toggleShowRemoveAccess = () => {
    showAddAccess && toggleShowAddAccess();
    showEditAlbum && toggleShowEditAlbum();
    showShare && toggleShowShare();
    setShowRemoveAccess((prev) => !prev);
  };

  const toggleShowShare = () => {
    showAddAccess && toggleShowAddAccess();
    showRemoveAccess && toggleShowRemoveAccess();
    showEditAlbum && toggleShowEditAlbum();
    setShowShare((prev) => !prev);
  };

  const handleEditAlbum = (formData) => {
    editAlbum(albumId, formData);
    toggleShowEditAlbum();
  };

  const handleToggleEditAlbum = (e) => {
    e.stopPropagation();
    showAddAccess && toggleShowAddAccess();
    showRemoveAccess && toggleShowRemoveAccess();
    showShare && toggleShowShare();
    toggleShowEditAlbum();
  };

  const handleDeleteAlbum = (e) => {
    e.stopPropagation();
    setClickedDeleteToTrue && setClickedDeleteToTrue();
    deleteAlbum(albumId);
  };

  return (
    <>
      {showEditAlbum && (
        <form
          className='space-y-3 my-auto'
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit(handleEditAlbum)}
        >
          <input
            className='w-full'
            type='text'
            required
            defaultValue={name}
            {...register('name')}
          />
          <div className='flex items-center'>
            <label htmlFor='isPublic' className='font-medium text-gray-700'>
              Is public
            </label>
            <input
              type='checkbox'
              defaultChecked={isPublic}
              {...register('isPublic')}
            />
          </div>
          <input
            className='w-full btn-basic py-2 px-3'
            type='submit'
            value='Confirm'
          />
        </form>
      )}
      {showAddAccess && <CurrentAlbumAddAccess />}
      {showRemoveAccess && <CurrentAlbumRemoveAccess />}
      {showShare && <CurrentAlbumShare albumId={albumId} />}
      {isCreator && (
        <ManagerButtons
          showEdit={showEditAlbum}
          handleToggleEdit={handleToggleEditAlbum}
          handleDelete={handleDeleteAlbum}
        >
          {isInsideAlbum && (
            <>
              {!isPublic && (
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
                        (showAddAccess
                          ? 'bg-blue-600 text-white'
                          : 'text-blue-600')
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
              <motion.div
                whileHover={{
                  scale: 1.2,
                }}
              >
                <AiOutlineShareAlt
                  onClick={toggleShowShare}
                  size='2rem'
                  strokeWidth='-1rem'
                  className={
                    'rounded-full transition-colors cursor-pointer duration-100 p-0.5 ' +
                    (showShare ? 'bg-blue-600 text-white' : 'text-blue-600')
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
  editAlbum,
  addAccessToAlbum,
  removeAccessFromAlbum,
})(AlbumManager);
