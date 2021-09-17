import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import setQueryParams from '../../../utils/setQueryParams';

const OrdersPanel = ({ location, history }) => {
  const [showFiltering, setShowFiltering] = useState(false);
  const { register, handleSubmit } = useForm();

  const toggleShowFiltering = () => {
    setShowFiltering((prev) => !prev);
  };

  const onSubmitSearch = ({ search }) => {
    setQueryParams(history, location, { search });
  };

  const onSubmitFilter = ({ ordering, status, createdOrAccessed }) => {
    setQueryParams(history, location, {
      ordering,
      status,
      created: createdOrAccessed === 'created' ? true : undefined,
      accessed: createdOrAccessed === 'accessed' ? true : undefined,
    });
  };

  return (
    <div className='bg-white rounded-b-lg shadow'>
      <form
        onSubmit={handleSubmit(onSubmitSearch)}
        className='flex flex-col items-center p-5 '
      >
        <label
          htmlFor='search'
          className='text-lg md:text-xl font-medium text-gray-700 text-center'
        >
          Search in vendor names and client first names, last names and emails
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
              <div>
                <label
                  htmlFor='status'
                  className='mt-3 text-gray-600 font-medium'
                >
                  Show:
                </label>
                <select
                  name='status'
                  {...register('status')}
                  className='w-56 flex-shrink mb-2.5'
                  defaultValue=''
                >
                  <option value=''>All</option>
                  <option value='0'>Canceled</option>
                  <option value='1'>Rejected</option>
                  <option value='2'>Waiting for acceptance</option>
                  <option value='3'>Accepted</option>
                  <option value='4'>Waiting for payment</option>
                  <option value='5'>Payment received</option>
                  <option value='6'>Finished</option>
                </select>
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
                  <option value='created'>created - ascending</option>
                  <option value='-created'>created - descending</option>
                  <option value='status'>status - ascending</option>
                  <option value='-status'>status - descending</option>
                  <option value='cost'>cost - ascending</option>
                  <option value='-cost'>cost - descending</option>
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

export default OrdersPanel;
