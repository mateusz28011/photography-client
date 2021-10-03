import React from 'react';
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiFillTwitterCircle,
  AiOutlinePhone,
  AiOutlineMail,
} from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
const Footer = () => {
  return (
    <footer className='mt-auto w-full bg-blue-600 text-white '>
      <div className='max-w-screen-2xl mx-auto flex flex-wrap gap-y-10 px-10 py-10 text-sm gap-x-10 md:justify-around 2xl:justify-evenly sm:text-base md:py-5'>
        <div className='w-full md:w-52 lg:w-64 xl:w-80 '>
          <Header>ABOUT</Header>
          <p>
            We are photography enthusiasts who are keen on programming. Our goal
            is to create place where every photographer can find everything
            needed to start his own business.
          </p>
        </div>
        <div className='w-max'>
          <Header>SOCIAL MEDIA</Header>
          <IconWithText text='photobay' Icon={AiFillFacebook} />
          <IconWithText text='photobay' Icon={AiFillYoutube} />
          <IconWithText text='@photobay' Icon={AiFillInstagram} />
          <IconWithText text='@photobay' Icon={AiFillTwitterCircle} />
        </div>
        <div className='w-max'>
          <Header>CONTACT</Header>
          <IconWithText text='(+48) 123 456 789' Icon={AiOutlinePhone} />
          <IconWithText text='contact@photobay.com' Icon={AiOutlineMail} />
          <IconWithText Icon={GoLocation}>
            <div className='whitespace-pre-line ml-2 self-center mt-1'>
              {'PhotoBay\nSzczecinska 32\n12-123 Szczecin'}
            </div>
          </IconWithText>
        </div>
      </div>
    </footer>
  );
};

const Header = ({ children }) => {
  return (
    <h3 className='font-medium text-lg mb-3 md:mb-4 lg:text-xl'>{children}</h3>
  );
};

const IconWithText = ({ text, Icon, children }) => {
  return (
    <div className='mt-1.5 flex'>
      <Icon className='w-6 h-6 md:w-7 md:h-7' />
      {children ? (
        children
      ) : (
        <span className='ml-2 cursor-pointer self-center wrap break-all'>
          {text}
        </span>
      )}
    </div>
  );
};

export default Footer;
