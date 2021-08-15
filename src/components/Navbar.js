import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
      <Link to='/login-register' className='block px-20'>
        LOGIN/REGISTER
      </Link>
    </div>
  );
};

export default Navbar;
