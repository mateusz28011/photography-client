import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createOrder, createOrderClearError } from '../../../actions/order';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import Loading from '../../Loading';
import ApiError from '../../ApiError';

const MakeOrder = ({
  loading,
  error,
  vendorId,
  history,
  createOrder,
  createOrderClearError,
}) => {
  const { register, handleSubmit } = useForm();

  const redirectToOrder = (orderId) => {
    history.push(`/order/${orderId}`);
  };

  const handleMakeOrder = (formData) => {
    formData.vendor = vendorId;
    error && createOrderClearError();
    createOrder(formData, redirectToOrder);
  };

  return loading ? (
    <Loading className='py-16' />
  ) : (
    <form className='w-full mt-8' onSubmit={handleSubmit(handleMakeOrder)}>
      {error && (
        <ApiError error={error} clearFunc={createOrderClearError} center />
      )}
      <div className='font-medium text-blue-600'>
        In the area below, explain what kind of services you expect from the
        vendor. If the vendor accepts your order, then you can communicate with
        each other by notes in the order. Price and payment are being
        established individually for each order by the vendor.
      </div>
      <textarea
        className='w-full h-60 mt-3'
        {...register('description')}
        required
        minLength={30}
      />
      <input
        className='w-full btn-basic py-2 mt-3'
        type='submit'
        value='Submit'
      />
    </form>
  );
};

const loadingSelector = createLoadingSelector(['CREATE_ORDER']);
const errorSelector = createErrorMessageSelector(['CREATE_ORDER']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  user: state.auth.user,
});

export default connect(mapStateToProps, { createOrder, createOrderClearError })(
  MakeOrder
);