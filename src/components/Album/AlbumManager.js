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
  AiOutlineUndo,
} from 'react-icons/ai';
import CurrentAlbumAddAccess from './CurrentAlbumAddAccess';
import CurrentAlbumRemoveAccess from './CurrentAlbumRemoveAccess';
import CurrentAlbumShare from './CurrentAlbumShare';
import { setAlbumInOrder } from '../../actions/order';

const AlbumManager = ({
  orderId,
  inOrder,
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
  setAlbumInOrder,
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
        <motion.form
          initial={isInsideAlbum && { opacity: 0 }}
          transition={isInsideAlbum && { duration: 0.5 }}
          animate={isInsideAlbum && { opacity: 1 }}
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
        </motion.form>
      )}
      {showAddAccess && <CurrentAlbumAddAccess />}
      {showRemoveAccess && <CurrentAlbumRemoveAccess />}
      {showShare && <CurrentAlbumShare albumId={albumId} />}
      {isCreator && (
        <motion.div layout={isInsideAlbum ? true : false}>
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
                {inOrder && (
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                    }}
                  >
                    <AiOutlineUndo
                      onClick={() => {
                        setAlbumInOrder(orderId, null);
                      }}
                      size='2rem'
                      strokeWidth='-1rem'
                      className='rounded-full transition-colors cursor-pointer duration-100 p-0.5 text-blue-600'
                    />
                  </motion.div>
                )}
              </>
            )}
          </ManagerButtons>
        </motion.div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  orderId: state.order?.data?.id,
});

export default connect(mapStateToProps, {
  deleteAlbum,
  editAlbum,
  addAccessToAlbum,
  removeAccessFromAlbum,
  setAlbumInOrder,
})(AlbumManager);
