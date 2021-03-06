import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEdit } from 'react-icons/ai';
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

  return isVendor || cost ? (
    <>
      {loading && <Loading className='rounded-b-lg' cover />}
      {showEditCost ? (
        <motion.form layout onSubmit={handleSubmit(onSubmit)} className='flex'>
          <motion.div
            layout
            layoutId='cost'
            className='font-medium self-start my-auto'
          >
            Cost:
          </motion.div>
          <motion.form
            layout
            layoutId='costContent'
            className='flex flex-col md:flex-row md:flex-wrap items-center '
          >
            <input
              type='text'
              required
              {...register('cost')}
              className='w-60 md:w-28 my-1 mx-2'
            />
            <select
              name='currency'
              {...register('currency')}
              defaultValue={currency}
              className='w-60 flex-shrink my-1 mx-2'
            >
              <option value='PLN'>PLN - Polish zloty</option>
              <option value='EUR'>EUR - Euro</option>
              <option value='USD'>USD - United States dollar</option>
            </select>
            <input
              type='submit'
              value='Submit'
              className='btn-basic w-60 md:w-28 py-1.5 px-7 my-1 mx-2'
            />
            <input
              type='button'
              value='Close'
              onClick={toggleShowEditCost}
              className='btn-basic w-60 md:w-28 py-1.5 px-7 my-1 mx-2'
            />
          </motion.form>
        </motion.form>
      ) : (
        <motion.div layout className='font-medium'>
          <motion.div className='inline-block' layout layoutId='cost'>
            Cost:
          </motion.div>
          <motion.form
            layout='position'
            layoutId='costContent'
            className='ml-2 inline-block text-lg text-blue-600'
          >
            {cost ? `${cost} ${currency}` : '-----'}
            {isVendor && [3, 4].includes(status) && (
              <AiOutlineEdit
                onClick={toggleShowEditCost}
                size={25}
                className='inline-block cursor-pointer ml-3'
              />
            )}
          </motion.form>
        </motion.div>
      )}
    </>
  ) : null;
};

const loadingSelector = createLoadingSelector(['UPDATE_ORDER_COST']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
});

export default connect(mapStateToProps, { updateOrderCost })(Cost);
