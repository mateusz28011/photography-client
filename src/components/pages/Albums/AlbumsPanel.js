import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import setQueryParams from '../../../utils/setQueryParams';

const AlbumsPanel = ({ albumId, location }) => {
  const [showFiltering, setShowFiltering] = useState(false);
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const toggleShowFiltering = () => {
    setShowFiltering((prev) => !prev);
  };

  const onSubmitSearch = ({ search }) => {
    setQueryParams(history, location, { search });
  };

  const onSubmitFilter = ({ ordering, isPublic: is_public }) => {
    setQueryParams(history, location, {
      ordering,
      is_public,
    });
  };

  return (
    <div
      className={'bg-white rounded-b-lg shadow' + (albumId ? ' hidden' : '')}
    >
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
          htmlFor='filtering'
          className='font-medium text-gray-700 flex items-center pb-2 pl-3'
        >
          Filtering
          {showFiltering ? (
            <FaChevronDown
              onClick={toggleShowFiltering}
              className='ml-2 cursor-pointer'
            />
          ) : (
            <FaChevronUp
              onClick={toggleShowFiltering}
              className='ml-2 cursor-pointer'
            />
          )}
        </label>
        {showFiltering && (
          <div className='flex flex-col sm:flex-row sm:items-center'>
            <div className='flex flex-col justify-start sm:pb-5 px-3 text-base ssm:flex-row ssm:space-x-8'>
              <div className='flex items-start mt-1'>
                <span className='text-gray-600 font-medium'>Show:</span>
                <div className='inline-block ml-3 ssm:flex ssm:space-x-8'>
                  <div>
                    <div className='flex items-center'>
                      <label>All</label>
                      <input
                        type='radio'
                        value={undefined}
                        defaultChecked
                        {...register('isPublic')}
                      />
                    </div>
                    <div className='flex items-center'>
                      <label>Public</label>
                      <input
                        type='radio'
                        value={true}
                        {...register('isPublic')}
                      />
                    </div>
                    <div className='flex items-center'>
                      <label>Private</label>
                      <input
                        type='radio'
                        value={false}
                        {...register('isPublic')}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor='ordering'
                  className='mt-3 text-gray-600 font-medium'
                >
                  Ordering:
                </label>
                <select
                  name='ordering'
                  {...register('ordering')}
                  className='w-56 flex-shrink mb-2.5'
                >
                  <option value=''>-----</option>
                  <option value='name'>name - ascending</option>
                  <option value='-name'>name - descending</option>
                  <option value='created'>created - ascending</option>
                  <option value='-created'>created - descending</option>
                </select>
              </div>
            </div>
            <input
              type='submit'
              value='Filter'
              className='btn-basic w-56 py-1.5 px-7 ml-3 mb-3 mt-1 sm:h-10 sm:w-28 sm:m-0 sm:mb-0.5'
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default AlbumsPanel;
