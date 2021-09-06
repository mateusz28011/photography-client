import React, { useEffect, useState } from 'react';
import Album from '../../Album/Album';
import { v4 } from 'uuid';
import ApiError from '../../ApiError';
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import {
  searchAlbums,
  searchCreateAlbumClearError,
} from '../../../actions/search';
import { useForm } from 'react-hook-form';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
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
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [albumId, setAlbumId] = useState();
  const [showCreateAlbum, setShowCreateAlbum] = useState(false);
  const [showOrdering, setShowOrdering] = useState(false);

  const toggleShowCreateAlbum = () => {
    setShowCreateAlbum((prev) => !prev);
  };

  const toggleShowOrdering = () => {
    setShowOrdering((prev) => !prev);
  };

  const onSubmitSearch = ({ search }) => {
    const parsed = queryString.parse(location.search);
    parsed.page = undefined;
    parsed.search = search ? search : undefined;
    const query = queryString.stringify(parsed);
    history.push(`${location.pathname}?${query}`);
  };

  const onSubmitFilter = ({ ordering }) => {
    const parsed = queryString.parse(location.search);
    parsed.ordering = ordering ? ordering : undefined;
    const query = queryString.stringify(parsed);
    history.push(`${location.pathname}?${query}`);
  };

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
      <div className='bg-white rounded-b-lg shadow'>
        <form
          onSubmit={handleSubmit(onSubmitSearch)}
          className='flex flex-col items-center p-5 '
        >
          <label
            htmlFor='search'
            className='text-lg md:text-xl font-medium text-gray-700 text-center'
          >
            Search in albums' titles
          </label>
          <div className='flex w-full justify-center flex-wrap items-center'>
            <input
              type='search'
              name='search'
              {...register('search')}
              className='w-48 flex-shrink mb-1'
            />
            <input
              type='submit'
              value='Search'
              className='btn-basic ml-4 py-1.5 px-5 mt-1 mb-1'
            />
          </div>
        </form>
        <form onSubmit={handleSubmit(onSubmitFilter)} className='text-lg'>
          <label
            htmlFor='ordering'
            className='font-medium text-gray-700 flex items-center pb-2 pl-3'
          >
            Ordering
            {showOrdering ? (
              <FaChevronDown
                onClick={toggleShowOrdering}
                className='ml-2 cursor-pointer'
              />
            ) : (
              <FaChevronUp
                onClick={toggleShowOrdering}
                className='ml-2 cursor-pointer'
              />
            )}
          </label>
          {showOrdering && (
            <div className='flex w-full justify-start flex-wrap items-center pb-5 px-3'>
              <select
                name='ordering'
                {...register('ordering')}
                className='w-56 flex-shrink'
              >
                <option value='name'>name - ascending</option>
                <option value='-name'>name - descending</option>
                <option value='created'>created - ascending</option>
                <option value='-created'>created - descending</option>
              </select>
              <input
                type='submit'
                value='Filter'
                className='btn-basic ml-4 py-1.5 px-7 mt-1'
              />
            </div>
          )}
        </form>
      </div>
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
    </div>
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
