import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { searchProfiles } from '../../../actions/search';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import NavigationNextPrevious from './NavigationNextPrevious';
import ApiError from '../../ApiError';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import Loading from '../../Loading';
import setQueryParams from '../../../utils/setQueryParams';
import { motion } from 'framer-motion';
import pageAnimation from '../pageAnimation';

const Search = ({ loading, error, data, searchProfiles }) => {
  const location = useLocation();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [showOrdering, setShowOrdering] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const toggleShowOrdering = () => {
    setShowOrdering((prev) => !prev);
  };

  const onSubmitSearch = ({ search }) => {
    setQueryParams(history, location, { search });
  };

  const onSubmitFilter = ({ ordering }) => {
    setQueryParams(history, location, { ordering });
  };

  const showVendor = ({ id }) => {
    history.push(`/vendor/${id}`);
  };

  useEffect(() => {
    console.log('fetch vendors');
    searchProfiles(location.search);
    dataLoaded === false && setDataLoaded(true);
  }, [searchProfiles, location, dataLoaded]);

  return (
    <motion.div {...pageAnimation}>
      <div className='bg-white rounded-b-lg shadow'>
        <form
          onSubmit={handleSubmit(onSubmitSearch)}
          className='flex flex-col items-center p-5 '
        >
          <label
            htmlFor='search'
            className='text-lg md:text-xl font-medium text-gray-700 text-center'
          >
            Search in names and descriptions
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
                <option value=''>-----</option>
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
      <div className=''>
        {loading ? (
          <Loading />
        ) : error ? (
          <ApiError error={error} center />
        ) : dataLoaded ? (
          data && data.results.length !== 0 ? (
            <>
              <div className='mt-3 grid md:grid-cols-2 md:gap-x-3 auto-rows-max px-3 2xl:px-0'>
                {data.results.map((vendor, index) => (
                  <Vendor vendor={vendor} showVendor={showVendor} key={index} />
                ))}
              </div>
              <NavigationNextPrevious
                previous={data?.previous}
                next={data?.next}
              />
            </>
          ) : (
            <div className='w-full my-5 text-xl font-medium tracking-wide text-center'>
              Nothing was found
            </div>
          )
        ) : null}
      </div>
    </motion.div>
  );
};

const Vendor = ({ vendor, showVendor }) => {
  const { name, avatar, description } = vendor;
  return (
    <div className='bg-white mb-3 rounded-lg shadow px-5 py-9 flex flex-col justify-start w-full sm:flex-none sm:grid sm:gap-y-4 sm:grid-rows-4 sm:grid-cols-6 sm:gap-x-5 sm:h-72'>
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        className='w-max mx-auto h-52 object-contain shadow rounded sm:w-auto sm:h-full sm:row-span-full sm:col-span-2 sm:self-center'
      />
      <div className='text-center mt-6 mb-2.5 text-xl font-semibold sm:my-0 sm:col-start-3 sm:col-end-7 sm:flex sm:items-center sm:justify-center'>
        <div>{name}</div>
      </div>
      <div className='line-clamp-4 sm:mb-0 sm:col-start-3 sm:col-end-7 sm:row-start-2 sm:row-end-4 lg:line-clamp-4'>
        {description}
      </div>
      <button
        onClick={() => {
          showVendor(vendor);
        }}
        className='btn-basic py-2 mt-6 sm:mt-auto sm:col-start-3 sm:col-end-7'
      >
        Show
      </button>
    </div>
  );
};

const loadingSelector = createLoadingSelector(['SEARCH']);
const errorSelector = createErrorMessageSelector(['SEARCH']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  data: state.search?.profiles,
});

export default connect(mapStateToProps, { searchProfiles })(Search);
