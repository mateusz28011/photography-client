import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';

const Navbar = ({ user, logoutUser }) => {
  console.log(user);
  return (
    <div className='flex-row sm:flex bg-sky-500 w-full mx-auto'>
      <Link to='/'>Photography</Link>
      <div className='flex-row sm:flex sm:ml-auto'>
        <Link to='/' className='block'>
          LINK1
        </Link>
        <Link to='/' className='block'>
          LINK2
        </Link>
        <Link to='/' className='block'>
          LINK3
        </Link>
      </div>
      {user ? (
        <Link to='/' onClick={logoutUser} className='block px-20'>
          LOGOUT
        </Link>
      ) : (
        <Link to='/login-register' className='block px-20'>
          LOGIN/REGISTER
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
