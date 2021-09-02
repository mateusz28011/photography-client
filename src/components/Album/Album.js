import React, { useEffect, useState } from 'react';
import ApiError from '../ApiError';
import { v4 } from 'uuid';
import { getAlbum } from '../../actions/album';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../selectors';
import { connect } from 'react-redux';
import PhotoTile from './PhotoTile';
import AlbumTile from './AlbumTile';
import CreatorTile from './CreatorTile';
import Preview from './Preview';
import Loading from '../Loading';
import AlbumApiErrors from './AlbumApiErrors';

const Album = ({
  albumId: rootAlbumId,
  user,
  loading,
  error,
  data,
  getAlbum,
}) => {
  const { images, childAlbums } = data || {};
  const { id: creatorId } = data?.creator || {};
  const parentAlbum = data?.parentAlbum || null;
  const [isCreator, setIsCreator] = useState(false);
  const [albumId, setAlbumId] = useState(rootAlbumId);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    console.log('fetch album');
    getAlbum(albumId);
  }, [getAlbum, albumId]);

  useEffect(() => {
    if (user && creatorId)
      user?.id === creatorId ? setIsCreator(true) : setIsCreator(false);
  }, [user, creatorId]);

  return loading ? (
    <Loading className='my-32' />
  ) : error ? (
    <ApiError error={error} center />
  ) : data ? (
    <>
      <AlbumApiErrors />
      {(showPreview || showPreview === 0) && (
        <Preview
          images={images}
          imageIndex={showPreview}
          setShowPreview={setShowPreview}
        />
      )}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 p-3 2xl:justify-between 2xl:px-0'>
        <CreatorTile isCreator={isCreator} albumId={albumId} />
        {parentAlbum && (
          <AlbumTile
            {...parentAlbum}
            parent
            isCreator={isCreator}
            setAlbumId={setAlbumId}
            key={v4()}
          />
        )}
        {childAlbums &&
          childAlbums.map((album) => {
            return (
              <AlbumTile
                {...album}
                isCreator={isCreator}
                setAlbumId={setAlbumId}
                key={v4()}
              />
            );
          })}
        {images &&
          images.map((image, index) => {
            return (
              <PhotoTile
                {...image}
                index={index}
                setShowPreview={setShowPreview}
                isCreator={isCreator}
                key={v4()}
              />
            );
          })}
      </div>
    </>
  ) : null;
};

const loadingSelector = createLoadingSelector(['GET_ALBUM']);
const errorSelector = createErrorMessageSelector(['GET_ALBUM']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  data: state.album.data,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getAlbum,
})(Album);
