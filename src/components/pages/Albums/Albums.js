import React, { useEffect, useState } from 'react';
import Album from '../../Album/Album';
import { v4 } from 'uuid';
import ApiError from '../../ApiError';
import { useLocation } from 'react-router-dom';
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

const Albums = ({
  loading,
  error,
  data,
  user,
  searchAlbums,
  errorCreateAlbum,
  searchCreateAlbumClearError,
}) => {
  const albums = data?.results;
  const location = useLocation();
  const [albumId, setAlbumId] = useState();
  const [showCreateAlbum, setShowCreateAlbum] = useState(false);

  const toggleShowCreateAlbum = () => {
    setShowCreateAlbum((prev) => !prev);
  };

  useEffect(() => {
    console.log('fetch my albums');
    !albumId && searchAlbums(location.search);
  }, [searchAlbums, location, albumId]);

  const returnToMyAlbums = () => {
    setAlbumId(null);
  };

  return (
    <>
      <AlbumsPanel albumId={albumId} location={location} />
      {loading ? (
        <Loading className='py-32' />
      ) : error ? (
        <ApiError center error={error} />
      ) : (
        <>
          <ApiError
            center
            error={errorCreateAlbum}
            clearFunc={searchCreateAlbumClearError}
          />
          {!albumId && (
            <>
              <div className='grid grid-cols-2 min-h-tile sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 p-3 2xl:justify-between 2xl:px-0'>
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
                        setAlbumId={setAlbumId}
                        key={v4()}
                      />
                    );
                  })}
              </div>
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
      )}
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
