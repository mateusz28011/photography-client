import React, { useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { deleteImageFromAlbum } from '../../actions/album';
import { connect } from 'react-redux';

const PhotoManager = ({
  isCreator,
  albumId,
  imageId,
  deleteImageFromAlbum,
}) => {
  const handleDeleteImage = (e) => {
    e.stopPropagation();
    deleteImageFromAlbum(albumId, imageId);
  };

  return (
    <>
      {isCreator && (
        <div className='flex space-x-2'>
          <AiOutlineEdit
            size='2rem'
            strokeWidth='-1rem'
            className='hover:bg-blue-600 text-blue-600 hover:text-white rounded-full transition-colors duration-100 p-0.5'
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

export default connect(mapStateToProps, { deleteImageFromAlbum })(PhotoManager);
