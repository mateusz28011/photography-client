import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';
import { connect } from 'react-redux';
import { updateOrderCost } from '../../../actions/order';
import { createLoadingSelector } from '../../../selectors';
import Loading from '../../Loading';

const Cost = ({
  orderId,
  isVendor,
  status,
  cost,
  currency,
  loading,
  updateOrderCost,
}) => {
  const [showEditCost, setShowEditCost] = useState(false);
  const { register, handleSubmit } = useForm();
  const toggleShowEditCost = () => {
    setShowEditCost((prev) => !prev);
  };

  const onSubmit = (formData) => {
    updateOrderCost(orderId, formData);
    toggleShowEditCost();
  };

  return loading ? (
    <Loading size={16} borderWidth={4} className='py-4' />
  ) : isVendor || cost ? (
    <div className='font-medium'>
      Cost:
      {showEditCost ? (
        <form onSubmit={handleSubmit(onSubmit)} className='flex'>
          <div className='flex flex-col ssm:flex-row ssm:flex-wrap items-center'>
            <input
              type='text'
              required
              {...register('cost')}
              className='w-28 m-2'
            />
            <input
              type='submit'
              value='Submit'
              className='btn-basic py-1.5 px-7 m-2'
            />
          </div>
          <AiOutlineClose
            onClick={toggleShowEditCost}
            size={48}
            className='cursor-pointer my-auto m-2 text-red-600'
          />
        </form>
      ) : (
        <div className='ml-2 inline-block font-normal text-blue-600'>
          {cost ? `${cost} ${currency}` : '-----'}
          {isVendor && [3, 4].includes(status) && (
            <AiOutlineEdit
              onClick={toggleShowEditCost}
              size={25}
              className='inline-block cursor-pointer ml-3'
            />
          )}
        </div>
      )}
    </div>
  ) : null;
};

const loadingSelector = createLoadingSelector(['UPDATE_ORDER_COST']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
});

export default connect(mapStateToProps, { updateOrderCost })(Cost);
