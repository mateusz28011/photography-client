import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginUser, loginUserClearError } from '../../../actions/auth';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import ApiError, { Error } from '../../ApiError';
import { useHistory } from 'react-router-dom';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email.')
    .required('Email is required.'),
  password: yup.string().required('Password is required.'),
});

const Login = ({ user, loading, error, loginUser, loginUserClearError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const history = useHistory();

  // If the user logs in successfuly or is logged, redirect him to the home page.
  useEffect(() => {
    user && history.push('/');
  }, [user, history]);

  // Clear error left by api.
  useEffect(() => {
    return () => {
      loginUserClearError();
    };
  }, [loginUserClearError]);

  return loading ? (
    <p>loading</p>
  ) : (
    <>
      <div className='text-4xl font-black text-center mb-12 font-roboto mt-16 md:mt-28'>
        Sign in to your account
        <div className='font-medium text-base text-gray-500 mt-4'>
          Don't have an account yet?
          <Link
            to='register'
            className='text-blue-600 hover:text-blue-500 ml-1.5'
          >
            Sign up
          </Link>
        </div>
      </div>

      <div className='w-full mx-auto max-w-md py-8 px-6 bg-white rounded-lg shadow mb-16 md:mb-28'>
        <ApiError error={error} />
        <form className='space-y-6' onSubmit={handleSubmit(loginUser)}>
          <div>
            <label htmlFor='email' className='font-medium text-gray-700'>
              Email
            </label>
            <input type='email' autoComplete='email' {...register('email')} />
            <Error error={formErrors.email?.message} />
          </div>
          <div>
            <label htmlFor='password' className='font-medium text-gray-700'>
              Password
            </label>
            <input type='password' {...register('password')} />
            <Error error={formErrors.password?.message} />
          </div>
          <input
            className='w-full btn-basic py-2'
            type='submit'
            value='Sign in'
            disabled={loading ? true : false}
          />
        </form>
      </div>
    </>
  );
};

const loadingSelector = createLoadingSelector(['LOGIN']);
const errorSelector = createErrorMessageSelector(['LOGIN']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  user: state.auth.user,
});

export default connect(mapStateToProps, { loginUser, loginUserClearError })(
  Login
);
