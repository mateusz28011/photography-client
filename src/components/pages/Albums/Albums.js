import React, { useEffect, useState } from 'react';
import Album from '../../Album/Album';
import { v4 } from 'uuid';
import ApiError from '../../ApiError';
import {
  searchAlbums,
  searchCreateAlbumClearError,
} from '../../../actions/search';
import { connect } from 'react-redux';
import Loading from '../../Loading';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import NavigationNextPrevious from '../Search/NavigationNextPrevious';
import AlbumTile from '../../Album/AlbumTile';
import CreateAlbum from './CreateAlbum';
import Tile from '../../Album/Tile';
import AlbumsPanel from './AlbumsPanel';
import setQueryParams from '../../../utils/setQueryParams';
import getQueryParams from '../../../utils/getQueryParams';
import { useLocation, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import pageAnimation from '../pageAnimation';

const Albums = ({
  loading,
  error,
  data,
  searchAlbums,
  errorCreateAlbum,
  searchCreateAlbumClearError,
}) => {
  const history = useHistory();
  const location = useLocation();
  const albums = data?.results;
  const [albumId, setAlbumId] = useState(
    parseInt(getQueryParams(location, ['album']).album) || undefined
  );
  const [showCreateAlbum, setShowCreateAlbum] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleSetAlbumId = (albumId) => {
    setQueryParams(history, location, { album: albumId });
    setAlbumId(albumId);
  };

  const toggleShowCreateAlbum = () => {
    setShowCreateAlbum((prev) => !prev);
  };

  useEffect(() => {
    if (albumId && !dataLoaded) setDataLoaded(true);
    if (!albumId) {
      console.log('fetch my albums');
      searchAlbums(location.search);
      dataLoaded === false && setDataLoaded(true);
    }
  }, [searchAlbums, location, albumId, dataLoaded]);

  const returnToMyAlbums = () => {
    setQueryParams(history, location, { album: null });
    setAlbumId(null);
  };

  return (
    <>
      <AlbumsPanel albumId={albumId} location={location} />
      {loading ? (
        <Loading className='py-32' />
      ) : error ? (
        <ApiError center error={error} />
      ) : dataLoaded ? (
        <>
          <ApiError
            center
            error={errorCreateAlbum}
            clearFunc={searchCreateAlbumClearError}
          />
          {!albumId && (
            <>
              <motion.div
                layout
                className='grid grid-cols-2 min-h-tile sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 p-3 2xl:justify-between 2xl:px-0'
                {...pageAnimation}
              >
                {showCreateAlbum ? (
                  <CreateAlbum toggleShowCreateAlbum={toggleShowCreateAlbum} />
                ) : (
                  <Tile>
                    <div className='h-full flex items-center w-full justify-center'>
                      <button
                        onClick={toggleShowCreateAlbum}
                        className='h-3/4 w-11/12 btn-border px-1 text-sm ssm:text-lg md:text-xl py-auto'
                      >
                        Create an album
                      </button>
                    </div>
                  </Tile>
                )}
                {albums &&
                  !albumId &&
                  albums.map((album) => {
                    return (
                      <AlbumTile
                        {...album}
                        handleSetAlbumId={handleSetAlbumId}
                        key={v4()}
                      />
                    );
                  })}
              </motion.div>
              <NavigationNextPrevious
                previous={data?.previous}
                next={data?.next}
              />
            </>
          )}
          {albumId && (
            <Album albumId={albumId} returnToMyAlbums={returnToMyAlbums} />
          )}
        </>
      ) : null}
    </>
  );
};

const loadingSelector = createLoadingSelector(['SEARCH']);
const errorSelector = createErrorMessageSelector(['SEARCH']);
const errorCreateAlbumSelector = createErrorMessageSelector([
  'SEARCH_CREATE_ALBUM',
]);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  errorCreateAlbum: errorCreateAlbumSelector(state),
  data: state.search?.albums,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  searchAlbums,
  searchCreateAlbumClearError,
})(Albums);
