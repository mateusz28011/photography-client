import React, { useEffect, useState } from 'react';
import Album from '../../Album/Album';
import { v4 } from 'uuid';
import ApiError from '../../ApiError';
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import { searchAlbums } from '../../../actions/search';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import Loading from '../../Loading';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import NavigationNextPrevious from '../Search/NavigationNextPrevious';
import AlbumTile from '../../Album/AlbumTile';
import AlbumApiErrors from '../../Album/AlbumApiErrors';

const Albums = ({ loading, error, data, user, searchAlbums }) => {
  const albums = data?.results;
  const location = useLocation();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [albumId, setAlbumId] = useState();

  //   const onSubmitSearch = ({ search }) => {
  //     const parsed = queryString.parse(location.search);
  //     parsed.page = undefined;
  //     parsed.search = search ? search : undefined;
  //     const query = queryString.stringify(parsed);
  //     history.push(`${location.pathname}?${query}`);
  //   };

  //   const onSubmitFilter = ({ ordering }) => {
  //     const parsed = queryString.parse(location.search);
  //     parsed.ordering = ordering ? ordering : undefined;
  //     const query = queryString.stringify(parsed);
  //     history.push(`${location.pathname}?${query}`);
  //   };

  useEffect(() => {
    console.log('fetch my albums');
    !albumId && searchAlbums(location.search);
  }, [searchAlbums, location, albumId]);

  // const isCreator = (album) => {
  //   return album.creator.id === user.id;
  // };

  const returnToMyAlbums = () => {
    setAlbumId(null);
  };

  return (
    <div>
      {loading ? (
        <Loading className='py-32' />
      ) : error ? (
        <ApiError center error={error} />
      ) : (
        <>
          {!albumId && (
            <>
              <div className='grid grid-cols-2 min-h-tile sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 p-3 2xl:justify-between 2xl:px-0'>
                {albums &&
                  !albumId &&
                  albums.map((album) => {
                    return (
                      <AlbumTile
                        {...album}
                        // isCreator={isCreator(album)}
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
    </div>
  );
};

const loadingSelector = createLoadingSelector(['SEARCH']);
const errorSelector = createErrorMessageSelector(['SEARCH']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  data: state.search?.albums,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  searchAlbums,
})(Albums);
