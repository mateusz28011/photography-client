import React from 'react';
import Tile from './Tile';
import PhotoManager from './PhotoManager';
import { connect } from 'react-redux';
import Loading from '../Loading';

const PhotoTile = ({
  id: imageId,
  thumbnailUrl,
  title,
  setShowPreview,
  index,
  isCreator,
  loading,
}) => {
  const handleAlbumClick = () => {
    setShowPreview(index);
  };

  return (
    <Tile clickFunc={handleAlbumClick}>
      {loading && loading[String(imageId)] ? (
        <Loading />
      ) : (
        <>
          <img
            src={thumbnailUrl}
            alt={title}
            className='rounded mx-auto shadow-sm mb-3'
          />
          <div className='text-center my-auto w-52 flex items-center justify-center'>
            <span className='truncate pr-1'>{title}</span>
          </div>
          <PhotoManager isCreator={isCreator} imageId={imageId} />
        </>
      )}
    </Tile>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loading?.DELETE_IMAGE_FROM_ALBUM,
});

export default connect(mapStateToProps)(PhotoTile);
