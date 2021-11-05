import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUser, registerUserClearError } from '../../../actions/auth';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import ApiError, { Error } from '../../ApiError';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Success from '../../Success';
import Loading from '../../Loading';
import { motion } from 'framer-motion';
import pageAnimation from '../pageAnimation';

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

const Register = ({
  user,
  loading,
  error,
  registeredSuccessfully,
  registerUserClearError,
  registerUser,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    reValidateMode: 'onSubmit',
  });

  const history = useHistory();
  const timer = useRef(false);

  // If user is logged redirect to home page.
  // When the user remains on the registration page after successful registration, go to the login page.
  useEffect(() => {
    user && history.push('/');
    if (registeredSuccessfully) {
      timer.current = setTimeout(() => {
        history.push('/login');
      }, 10000);
    }
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, [user, history, registeredSuccessfully]);

  return (
    <motion.div {...pageAnimation} className='px-4'>
      <div className='text-4xl font-black text-center mb-12 mt-16 md:mt-28'>
        Create your account
        <div className='font-medium text-base text-gray-500 mt-4'>
          Already has account?
          <Link to='login' className='text-blue-600 hover:text-blue-500 ml-1.5'>
            Sign in
          </Link>
        </div>
      </div>
      <div className='w-full mx-auto max-w-md py-8 px-6 bg-white rounded-lg shadow mb-16 md:mb-28  relative'>
        {loading && <Loading className='rounded-lg' cover />}
        {registeredSuccessfully && (
          <Success
            success={
              'Registration was successful.\nNow you can activate your account by the link sent to your e-mail.'
            }
          />
        )}
        <form className='space-y-6' onSubmit={handleSubmit(registerUser)}>
          <div>
            <label htmlFor='firstName' className='font-medium text-gray-700'>
              First name
            </label>
            <input type='text' {...register('firstName')} />
            <Error error={formErrors.firstName?.message} />
            <ApiError
              error={error}
              name={'firstName'}
              clearFunc={registerUserClearError}
            />
          </div>
          <div>
            <label htmlFor='lastName' className='font-medium text-gray-700'>
              Last name
            </label>
            <input type='text' {...register('lastName')} />
            <Error error={formErrors.lastName?.message} />
            <ApiError
              error={error}
              name={'lastName'}
              clearFunc={registerUserClearError}
            />
          </div>
          <div>
            <label htmlFor='email' className='font-medium text-gray-700'>
              Email
            </label>
            <input type='email' {...register('email')} />
            <Error error={formErrors.email?.message} />
            <ApiError error={error} name={'email'} />
          </div>
          <div>
            <label htmlFor='password1' className='font-medium text-gray-700'>
              Password
            </label>
            <input type='password' {...register('password1')} />
            <Error error={formErrors.password1?.message} />
            <ApiError
              error={error}
              name={'password1'}
              clearFunc={registerUserClearError}
            />
          </div>
          <div>
            <label htmlFor='password2' className='font-medium text-gray-700'>
              Confirm password
            </label>
            <input type='password' {...register('password2')} />
            <Error error={formErrors.password2?.message} />
          </div>
          <input
            className='w-full btn-basic py-2'
            type='submit'
            value='Sign Up'
            disabled={loading ? true : false}
          />
        </form>
      </div>
    </motion.div>
  );
};

const loadingSelector = createLoadingSelector(['REGISTER']);
const errorSelector = createErrorMessageSelector(['REGISTER']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  registeredSuccessfully: state.auth?.registeredSuccessfully,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  registerUser,
  registerUserClearError,
})(Register);
