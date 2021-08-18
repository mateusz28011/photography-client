import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginUser } from '../../../actions/auth';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../../selectors';
import ApiError from '../../ApiError';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email.')
    .required('Email is required.'),
  password: yup.string().required('Password is required.'),
});

const Login = ({ loading, error, loginUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  return loading ? (
    <p>loading</p>
  ) : (
    <>
      <div>LOGIN</div>
      <ApiError error={error} />
      <form className='flex-row' onSubmit={handleSubmit(loginUser)}>
        <label htmlFor='email'>Email:</label>
        <input
          className='block'
          type='email'
          placeholder='email'
          {...register('email')}
        />
        <p>{formErrors.email?.message}</p>
        <label htmlFor='password'>Password:</label>
        <input
          className='block'
          type='password'
          placeholder='password'
          {...register('password')}
        />
        <p>{formErrors.password?.message}</p>
        <input
          className='block'
          type='submit'
          value='Login'
          disabled={loading ? true : false}
        />
      </form>
    </>
  );
};

const loadingSelector = createLoadingSelector(['LOGIN']);
const errorSelector = createErrorMessageSelector(['LOGIN']);

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  error: errorSelector(state),
});

export default connect(mapStateToProps, { loginUser })(Login);
