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
import Tile from './Tile';
import CreatorTile from './CreatorTile';
import Preview from './Preview';
import Loading from '../Loading';
import AlbumApiErrors from './AlbumApiErrors';
import BackButton from './BackButton';
import CurrentAlbumInfo from './CurrentAlbumInfo';
import setQueryParams from '../../utils/setQueryParams';
import { useLocation, useHistory } from 'react-router-dom';
import getQueryParams from '../../utils/getQueryParams';

const Album = ({
  albumId: rootAlbumId,
  user,
  loading,
  error,
  data,
  getAlbum,
  returnToMyAlbums,
  isPortfolio,
}) => {
  const { images, childAlbums, name } = data || {};
  const { id: creatorId } = data?.creator || {};
  const parentAlbum = data?.parentAlbum || null;
  const [isCreator, setIsCreator] = useState(false);
  const [albumId, setAlbumId] = useState();
  const [showPreview, setShowPreview] = useState(false);
  const [showRenameAlbum, setShowRenameAlbum] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const toggleShowRenameAlbum = () => {
    setShowRenameAlbum((prev) => !prev);
  };

  useEffect(() => {
    const album = getQueryParams(location, ['album']).album;
    album
      ? setAlbumId(album)
      : isPortfolio
      ? setAlbumId(rootAlbumId)
      : returnToMyAlbums && returnToMyAlbums();
  }, [location, rootAlbumId, isPortfolio, returnToMyAlbums]);

  const handleSetAlbumId = (albumId) => {
    setQueryParams(history, location, { album: albumId });
    setAlbumId(albumId);
  };

  useEffect(() => {
    console.log('fetch album');
    albumId && getAlbum(albumId);
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
      <CurrentAlbumInfo
        albumId={albumId}
        isCreator={isCreator}
        name={name}
        showRenameAlbum={showRenameAlbum}
        toggleShowRenameAlbum={toggleShowRenameAlbum}
        returnToMyAlbums={returnToMyAlbums}
      />
      <div className='grid grid-cols-2 auto-rows-fr sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 p-3 2xl:justify-between 2xl:px-0'>
        {returnToMyAlbums && (
          <Tile>
            <BackButton onClick={returnToMyAlbums} />
            <div
              onClick={returnToMyAlbums}
              className='my-auto text-center flex items-center justify-center h-3/5 btn-border  '
            >
              <div className='px-4 text-sm ssm:text-lg md:text-xl'>
                Back to my albums
              </div>
            </div>
          </Tile>
        )}
        {parentAlbum && (
          <AlbumTile
            {...parentAlbum}
            parent
            isCreator={isCreator}
            setAlbumId={handleSetAlbumId}
            key={v4()}
          />
        )}
        <CreatorTile isCreator={isCreator} albumId={albumId} />
        {childAlbums &&
          childAlbums.map((album) => {
            return (
              <AlbumTile
                {...album}
                isCreator={isCreator}
                setAlbumId={handleSetAlbumId}
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
