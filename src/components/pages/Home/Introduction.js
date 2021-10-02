import React, { useState } from 'react';
import account from './graphics/undraw_Access_account_re_8spm.svg';
import album from './graphics/undraw_photo_album_re_31c2.svg';
import feedback from './graphics/undraw_Begin_chat_re_v0lw.svg';

const renderSwitch = (param) => {
  switch (param) {
    case 1:
      return <FirstStep />;
    case 2:
      return <SecondStep />;
    case 3:
      return <ThirdStep />;
    default:
      return null;
  }
};

const Introduction = () => {
  const [step, setStep] = useState(1);

  return (
    <section className='h-screen flex flex-col'>
      <div className='relative -top-px text-white bg-blue-600 z-10 '>
        <h2 className='text-center w-full pt-8 md:pt-10 lg:pt-12 text-4xl md:text-5xl lg:text-6xl xl:text-7xl'>
          How it works?
        </h2>
        <div className='grid grid-cols-5 px-5 md:px-7 lg:px-8 xl:px-10 text-center py-10 md:py-12 lg:py-14'>
          <Number number={1} step={step} setStep={setStep} />
          <Line />
          <Number number={2} step={step} setStep={setStep} />
          <Line />
          <Number number={3} step={step} setStep={setStep} />
        </div>
      </div>
      <svg
        preserveAspectRatio='none'
        viewBox='0 0 1680 40'
        className='w-full bg-white relative -top-0.5 flex-shrink-0'
        style={{ transform: 'scale(-1)' }}
      >
        <path d='M0 40h1680V30S1340 0 840 0 0 30 0 30z' fill='#2563EB'></path>
      </svg>
      <div className='px-5 md:px-10 py-6 bg-white flex-auto flex flex-col justify-evenly text-gray-600 text-lg sm:text-xl md:text-2xl lg:text-3xl sm:flex-row sm:items-center'>
        {renderSwitch(step)}
      </div>
    </section>
  );
};

const Number = ({ number, step, setStep }) => {
  return (
    <div
      onClick={number === step ? undefined : () => setStep(number)}
      className={
        'h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 xl:h-32 xl:w-32 border-2 xl:border-4 rounded-full flex items-center justify-center mx-auto border-white ' +
        (number === step ? 'text-blue-600 bg-white' : 'cursor-pointer')
      }
    >
      <div className='text-2xl sm:text-4xl md:text-5xl xl:text-7xl'>
        {number}
      </div>
    </div>
  );
};

const Line = () => {
  return (
    <div className='border-2 h-1 self-center border-white rounded-full'></div>
  );
};

const FirstStep = () => {
  return (
    <>
      <p className='pb-12 sm:pr-5'>
        <span className='text-blue-600 font-medium'>Firstly</span>, create your
        account for free. If you want to become a vendor, you additionally need
        to create your vendor profile in the account tab.
      </p>
      <img
        className='filter drop-shadow-md sm:w-1/2 flex-shrink '
        src={account}
        alt=''
      />
    </>
  );
};

const SecondStep = () => {
  return (
    <>
      <div className='text-base sm:text-xl md:text-2xl lg:text-3xl sm:w-1/2 sm:pr-10'>
        <p className='pb-6 sm:pb-12 '>
          As <span className='text-blue-600 font-medium'>a buyer</span> you can
          see all available vendors, their portfolios and descriptions to then
          decide which is your favourite and make order for service.
        </p>
        <p className='pb-10 sm:pb-0 '>
          As <span className='text-blue-600 font-medium'>a vendor</span> you can
          offer your services, manage orders, profile, and choose photos to
          represent yourself. Also you can create photo albums and share them
          for certain users or create public link.
        </p>
      </div>
      <img className='filter drop-shadow-md sm:w-1/2' src={album} alt='' />
    </>
  );
};

const ThirdStep = () => {
  return (
    <>
      <p className='pb-12 sm:pr-5'>
        We care very much about{' '}
        <span className='text-blue-600 font-medium'>contact</span> with users,
        so if you have any suggestions for changes or noticed any problems while
        using the website, please let us know.
      </p>
      <img className='filter drop-shadow-md sm:w-1/2' src={feedback} alt='' />
    </>
  );
};

export default Introduction;
