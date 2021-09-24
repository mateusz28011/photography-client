import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  loginUser,
  loginUserClearError,
  loginFacebook,
  loginFacebookClearError,
  loginGoogle,
} from '../../../actions/auth';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import ApiError, { Error } from '../../ApiError';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import Loading from '../../Loading';
import GoogleLogin from 'react-google-login';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email.')
    .required('Email is required.'),
  password: yup.string().required('Password is required.'),
});

const Login = ({
  user,
  loading,
  error,
  loginUser,
  loginUserClearError,
  loginFacebookError,
  loginFacebook,
  loginFacebookClearError,
  loginGoogle,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  if (!user) {
    return (
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

        <div className='w-full mx-auto max-w-md py-8 px-6 bg-white rounded-lg shadow mb-16 md:mb-28 relative'>
          {loading && <Loading className='rounded-lg z-30' cover />}
          {error && <ApiError error={error} clearFunc={loginUserClearError} />}
          {loginFacebookError && (
            <ApiError
              error={loginFacebookError}
              clearFunc={loginFacebookClearError}
            />
          )}
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
          <div>
            <div className='flex justify-center font-medium my-3 text-center text-xl text-gray-600 relative'>
              <div className='bg-white px-3 z-20'>OR</div>
              <span className='border-t-2 w-full block absolute top-1/2 z-0'></span>
            </div>
            <FacebookLogin
              appId='265833262067939'
              callback={(response) => {
                loginFacebookError && loginFacebookClearError();
                loginFacebook(response);
              }}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  style={{ backgroundColor: 'rgb(59,89,152)' }}
                  className='w-full flex items-center justify-center text-lg rounded-md shadow-sm font-medium text-white py-2'
                >
                  <AiFillFacebook className='mr-3' size='1.75rem' />
                  Sign in with Facebook
                </button>
              )}
            />
            <GoogleLogin
              clientId='832445217588-npj6ir770cepiv0g6nup5cfc9ak9rv92.apps.googleusercontent.com'
              responseType='code'
              cookiePolicy={'single_host_origin'}
              onSuccess={(response) => loginGoogle(response)}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  className='w-full flex items-center justify-center text-lg rounded-md shadow-sm border font-medium text-gray-600 py-2 mt-3'
                >
                  <FcGoogle className='mr-3' size='1.75rem' />
                  Sign in with Google
                </button>
              )}
            />
          </div>
        </div>
      </>
    );
  } else {
    return <Redirect to='/' />;
  }
};

const loadingSelector = createLoadingSelector(['LOGIN', 'LOGIN_FACEBOOK']);
const errorSelector = createErrorMessageSelector(['LOGIN']);
const loginFacebookErrorSelector = createErrorMessageSelector([
  'LOGIN_FACEBOOK',
]);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
  loginFacebookError: loginFacebookErrorSelector(state),
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  loginUser,
  loginUserClearError,
  loginFacebook,
  loginFacebookClearError,
  loginGoogle,
})(Login);
