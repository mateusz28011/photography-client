import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser } from '../../../actions/auth';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import ApiError from '../../ApiError';

const registerSchema = yup.object().shape({
  firstName: yup.string().required('First name is required.'),
  lastName: yup.string().required('Last name is required.'),
  email: yup
    .string()
    .email('Email must be a valid email.')
    .required('Email is required.'),
  password1: yup
    .string()
    .min(
      8,
      'This password is too short. It must contain at least 8 characters.'
    )
    .required('Password is required.'),
  password2: yup
    .string()
    .required('You must re-enter your password.')
    .oneOf([yup.ref('password1'), null], 'Passwords must match.'),
});

const Register = ({ loading, error, registeredSuccessfully, registerUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    reValidateMode: 'onSubmit',
  });

  return loading ? (
    <p>loading</p>
  ) : (
    <>
      <div>SIGNUP</div>
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
        <ApiError error={error} name={'firstName'} />
        <label htmlFor='lastName'>Last name:</label>
        <input
          className='block'
          type='text'
          placeholder='lastName'
          {...register('lastName')}
        />
        <p>{formErrors.lastName?.message}</p>
        <ApiError error={error} name={'lastName'} />
        <label htmlFor='email'>Email:</label>
        <input
          className='block'
          type='email'
          placeholder='email'
          {...register('email')}
        />
        <ApiError error={error} name={'email'} />
        <p>{formErrors.email?.message}</p>
        <label htmlFor='password1'>Password:</label>
        <input
          className='block'
          type='password'
          placeholder='password1'
          {...register('password1')}
        />
        <p>{formErrors.password1?.message}</p>
        <ApiError error={error} name={'password1'} />
        <label htmlFor='password2'>Confirm password:</label>
        <input
          className='block'
          type='password'
          placeholder='password2'
          {...register('password2')}
        />
        <p>{formErrors.password2?.message}</p>
        <input
          className='block'
          type='submit'
          value='Register'
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
