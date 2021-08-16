import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '../../../actions/auth';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import { checkAndReturnApiError } from '../../../utils';

const registerSchema = yup.object().shape({
  firstName: yup.string().required('First name is required.'),
  lastName: yup.string().required('Last name is required.'),
  email: yup
    .string()
    .email('Email must be a valid email.')
    .required('Email is required.'),
  password: yup
    .string()
    .min(
      8,
      'This password is too short. It must contain at least 8 characters.'
    )
    .required('Password is required.'),
  rePassword: yup
    .string()
    .required('You must re-enter your password.')
    .oneOf([yup.ref('password'), null], 'Passwords must match.'),
});

const Register = ({ loading, error, registeredSuccessfully, registerUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
    reValidateMode: 'onSubmit',
  });

  return loading ? (
    <p>loading</p>
  ) : (
    <>
      <div>REGISTER</div>
      {registeredSuccessfully && (
        <p>
          Now you can activate your account by the link sent to your e-mail.
        </p>
      )}
      <form className='flex-row' onSubmit={handleSubmit(registerUser)}>
        <label htmlFor='firstName'>First name:</label>
        <input
          className='block'
          type='text'
          placeholder='firstName'
          {...register('firstName')}
        />
        <p>{formErrors.firstName?.message}</p>
        {checkAndReturnApiError('firstName', error)}
        <label htmlFor='lastName'>Last name:</label>
        <input
          className='block'
          type='text'
          placeholder='lastName'
          {...register('lastName')}
        />
        <p>{formErrors.lastName?.message}</p>
        {checkAndReturnApiError('lastName', error)}
        <label htmlFor='email'>Email:</label>
        <input
          className='block'
          type='email'
          placeholder='email'
          {...register('email')}
        />
        {checkAndReturnApiError('email', error)}
        <p>{formErrors.email?.message}</p>
        <label htmlFor='password'>Password:</label>
        <input
          className='block'
          type='password'
          placeholder='password'
          {...register('password')}
        />
        <p>{formErrors.password?.message}</p>
        {checkAndReturnApiError('password', error)}
        <label htmlFor='rePassword'>Confirm password:</label>
        <input
          className='block'
          type='password'
          placeholder='rePassword'
          {...register('rePassword')}
        />
        <p>{formErrors.rePassword?.message}</p>
        <input
          className='block'
          type='submit'
          value='SIGN UP'
          disabled={loading ? true : false}
        />
      </form>
    </>
  );
};

const loadingSelector = createLoadingSelector(['REGISTER']);
const errorSelector = createErrorMessageSelector(['REGISTER']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  registeredSuccessfully: state.auth?.registeredSuccessfully,
});

export default connect(mapStateToProps, { registerUser })(Register);
