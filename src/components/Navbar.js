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
    <div
      id='menu'
      className='flex flex-col md:flex-row items-center w-full mx-auto text-center text-2xl bg-sky-500 text-white font-medium md:justify-between'
    >
      <div className='flex w-full md:w-auto justify-between mx-3 mt-1 md:-mt-1 md:ml-6'>
        <Link to='/' className='text-4xl m-2 md:m-0'>
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
          className='flex flex-col md:flex-row md:items-center md:text-lg'
        >
          <div id='link0' className='mt-1 md:my-2 md:mx-4'>
            <Link to='/vendor'>VENDORS</Link>
          </div>
          <div id='link1' className='menuLinkStyle'>
            <Link to='/2'>LINK2</Link>
          </div>
          <div id='link2' className='menuLinkStyle'>
            <Link to='/3'>LINK3</Link>
          </div>
          <div id='link3' className='menuLinkStyle'>
            <Link to='/4'>LINK4</Link>
          </div>
          <div id='link4' className='menuLinkStyle'>
            <Link to='/5'>LINK5</Link>
          </div>
          <div
            id='link5'
            className={
              'mt-5 mb-6 py-3 px-5 rounded-xl md:py-2 md:px-4 md:m-4 md:ml-6 ' +
              (user ? 'bg-red-400' : 'bg-green-400')
            }
          >
            {user ? (
              <Link to='/' onClick={logoutUser}>
                LOGOUT
              </Link>
            ) : (
              <Link to='/login-register'>LOGIN / SIGNUP</Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
