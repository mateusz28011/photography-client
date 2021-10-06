import React, { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import setQueryParams from '../../../utils/setQueryParams';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import pageAnimation from '../pageAnimation';

const OrdersPanel = ({ location, history }) => {
  const [showFiltering, setShowFiltering] = useState(false);
  const { register, handleSubmit } = useForm();
  const controls = useAnimation();

  const toggleShowFiltering = () => {
    setShowFiltering((prev) => !prev);
  };

  const onSubmitSearch = ({ search }) => {
    setQueryParams(history, location, { search });
  };

  const onSubmitFilter = ({ ordering, status, isVendorOrClient }) => {
    setQueryParams(history, location, {
      ordering,
      status,
      is_client: isVendorOrClient === 'client' ? true : undefined,
      is_vendor: isVendorOrClient === 'vendor' ? true : undefined,
    });
  };

  const animateFilterEnter = () => {
    showFiltering === true &&
      controls.start({
        x: 0,
        opacity: 1,
      });
  };

  return (
    <motion.div
      layout
      onLayoutAnimationComplete={animateFilterEnter}
      className='bg-white rounded-b-lg shadow'
      {...pageAnimation}
    >
      <motion.form
        layout
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
      </motion.form>
      <motion.form
        layout
        onSubmit={handleSubmit(onSubmitFilter)}
        className='text-lg'
      >
        <motion.label
          layout
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
        </motion.label>
        <AnimatePresence>
          {showFiltering && (
            <motion.div
              initial={{ x: '-25%', opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              animate={controls}
              exit={{ x: '-25%', opacity: 0 }}
              className='flex flex-col md:flex-row md:items-center'
            >
              <div className='flex flex-col justify-start md:pb-5 px-3 text-base md:flex-row md:space-x-8'>
                <div className='flex'>
                  <div className='text-gray-600 font-medium'>Am:</div>
                  <div className='ml-3'>
                    <div className='flex items-center'>
                      <label>Both</label>
                      <input
                        type='radio'
                        value={undefined}
                        defaultChecked
                        {...register('isVendorOrClient')}
                      />
                    </div>
                    <div className='flex items-center'>
                      <label>Client</label>
                      <input
                        type='radio'
                        value='client'
                        {...register('isVendorOrClient')}
                      />
                    </div>
                    <div className='flex items-center'>
                      <label>Vendor</label>
                      <input
                        type='radio'
                        value='vendor'
                        {...register('isVendorOrClient')}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='status'
                    className='mt-3 text-gray-600 font-medium'
                  >
                    Status:
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
                    <option value=''>-----</option>
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
                className='btn-basic w-56 py-1.5 px-7 ml-3 mb-3 mt-1 md:h-10 md:w-28 md:m-0 md:mb-0.5'
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </motion.div>
  );
};

export default OrdersPanel;
