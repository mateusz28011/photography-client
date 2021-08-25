import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
import NavbarMenuBtn from './NavbarMenuBtn';

const Navbar = ({ user, logoutUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleIsSmallScreen = () => {
    setIsSmallScreen((prev) => !prev);
  };

  useEffect(() => {
    const checkIsSmallScreen = () => {
      const check = window.innerWidth <= 768 ? true : false;
      if (isSmallScreen !== check) {
        toggleIsSmallScreen();
      }
    };

    checkIsSmallScreen();
    window.addEventListener('resize', checkIsSmallScreen);
    return () => {
      window.removeEventListener('resize', checkIsSmallScreen);
    };
  }, [isSmallScreen]);

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };

    const hideMenuClick = (e) => {
      if (
        ![
          'path1',
          'path2',
          'path3',
          'menu',
          'menuBtn',
          'menuLinks',
          'link0',
          'link1',
          'link2',
          'link3',
          'link4',
          'link5',
          'link6',
        ].includes(e.target.id)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', hideMenu);
    window.addEventListener('click', hideMenuClick);
    return () => {
      window.removeEventListener('resize', hideMenu);
      window.removeEventListener('click', hideMenuClick);
    };
  }, []);

  return (
    <nav
      id='menu'
      className='flex flex-col shadow md:flex-row items-center w-full mx-auto text-center text-xl bg-blue-600 text-white  md:justify-between md:py-3'
    >
      <div className='flex w-full md:w-auto justify-between mx-3 mt-1 md:ml-6'>
        <Link to='/' className='text-4xl m-2 md:m-0 font-medium'>
          Photo
        </Link>
        <NavbarMenuBtn
          className='focus:outline-none m-5 md:hidden transform scale-150'
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />
      </div>

      {(isMenuOpen || !isSmallScreen) && (
        <div
          id='menuLinks'
          className='flex space-y-3 pb-5 uppercase flex-col md:normal-case md:flex-row md:items-center md:text-lg md:space-y-0 md:space-x-4 md:pb-0 md:mr-6'
        >
          <div id='link0'>
            <Link to='/vendor'>Vendors</Link>
          </div>
          <div id='link1'>
            <Link to='/2'>LINK2</Link>
          </div>
          <div id='link2'>
            <Link to='/3'>LINK3</Link>
          </div>
          <div className='flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-4 items-center'>
            {user ? (
              <>
                <div id='link3'>
                  <Link to='/4'>My account</Link>
                </div>
                <Link id='link6' to='/' onClick={logoutUser}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <div id='link4'>
                  <Link to='/login'>Sign In</Link>
                </div>
                <div id='link5' className='border-2 rounded-md px-2 py-0.5'>
                  <Link to='/register'>Sign Up</Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
