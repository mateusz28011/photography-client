import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEdit } from 'react-icons/ai';
import { connect } from 'react-redux';
import { updateOrderStatus } from '../../../actions/order';
import { createLoadingSelector } from '../../../selectors';
import Loading from '../../Loading';

const statuses = [
  [0, 'Canceled'],
  [1, 'Rejected'],
  [2, 'Waiting for acceptance'],
  [3, 'Accepted'],
  [4, 'Waiting for payment'],
  [5, 'Payment received'],
  [6, 'Finished'],
];

const getChoosedStatuses = (choosedStatuses) => {
  return statuses.filter((status) => choosedStatuses.includes(status[0]));
};

const getStatuses = (isVendor, status) => {
  if (!isVendor) {
    if (status === 2) return getChoosedStatuses([0]);
  } else {
    if (status === 2) return getChoosedStatuses([1, 3]);
    else if (status === 3) return getChoosedStatuses([0, 4, 6]);
    else if (status === 4) return getChoosedStatuses([0, 5, 6]);
    else if (status === 5) return getChoosedStatuses([0, 6]);
  }
  return undefined;
};

const Status = ({
  orderId,
  isVendor,
  status,
  statusDisplay,
  loading,
  updateOrderStatus,
}) => {
  const [showEditStatus, setShowEditStatus] = useState(false);
  const { register, handleSubmit } = useForm();
  const toggleShowEditStatus = () => {
    setShowEditStatus((prev) => !prev);
  };
  const statuses = getStatuses(isVendor, status);

  const onSubmit = (formData) => {
    updateOrderStatus(orderId, formData);
    toggleShowEditStatus();
  };

  return (
    <>
      {loading && <Loading className='rounded-b-lg' cover />}
      <div className={'text-lg text-center' + (showEditStatus ? ' my-2' : '')}>
        {showEditStatus ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-56 sm:w-auto text-blue-600'
          >
            <div className='flex w-full justify-start sm:justify-center flex-wrap items-center sm:px-3 sm:flex-nowrap'>
              <div className='mr-2 text-xl text-black t'>Set status:</div>
              <select
                name='status'
                {...register('status')}
                className='w-full sm:w-52 flex-shrink'
              >
                {statuses.map((status, index) => (
                  <option value={status[0]} key={index}>
                    {status[1]}
                  </option>
                ))}
              </select>
              <input
                type='submit'
                value='Submit'
                className='btn-basic w-full sm:w-auto sm:ml-4 py-1.5 px-7 mt-2.5 sm:mt-1 sm:mb-0'
              />
              <input
                type='button'
                value='Close'
                onClick={toggleShowEditStatus}
                className='btn-basic w-full sm:w-auto sm:ml-4 py-1.5 px-7 my-2.5 sm:mt-1 sm:mb-0'
              />
            </div>
          </form>
        ) : (
          <>
            <div className='inline-block mr-2 text-xl text-black'>Status:</div>
            <div className='inline-block text-lg font-medium text-blue-600'>
              {statusDisplay}
              {statuses && (
                <AiOutlineEdit
                  onClick={toggleShowEditStatus}
                  size={25}
                  className='inline-block cursor-pointer ml-2'
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const loadingSelector = createLoadingSelector(['UPDATE_ORDER']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
});

export default connect(mapStateToProps, { updateOrderStatus })(Status);
