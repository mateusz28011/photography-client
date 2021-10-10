import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { connect } from 'react-redux';
import { setCurrentImage } from '../../actions/preview';

const Preview = ({ images, currentImage, setCurrentImage }) => {
  const [firstSkip, setFirstSkip] = useState(true);
  const [isLeftSkip, setIsLeftSkip] = useState(false);

  const nextImage = () => {
    if (firstSkip === true) setFirstSkip(false);
    setIsLeftSkip(false);
    setCurrentImage(currentImage + 1);
  };
  const previousImage = () => {
    if (firstSkip === true) setFirstSkip(false);
    setIsLeftSkip(true);
    setCurrentImage(currentImage - 1);
  };

  const keyPressed = (e) => {
    if (e.keyCode === 37 && currentImage !== 0) {
      previousImage();
    } else if (e.keyCode === 39 && currentImage !== images.length - 1) {
      nextImage();
    } else if (e.keyCode === 27) {
      setCurrentImage(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyPressed);
    return () => {
      window.removeEventListener('keydown', keyPressed);
    };
  });

  return currentImage || currentImage === 0 ? (
    <motion.div
      className='fixed h-19/20 max-h-screen w-19/20 max-w-screen-2xl inset-0 m-auto text-white shadow-lg rounded-xl bg-blue-600 border-2 border-white backdrop-filter backdrop-blur-xl bg-opacity-90'
      style={{ zIndex: 100 }}
      initial={{ x: '-100vw', opacity: 0, transition: { duration: 0.5 } }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          duration: 1,
        },
      }}
      exit={{ x: '-100vw', opacity: 0, transition: { duration: 0.5 } }}
    >
      <HiX
        className='absolute w-10 h-10 sm:w-14 sm:h-14 mr-3 mt-3 top-0 right-0 z-50 cursor-pointer transition-transform transform hover:scale-110'
        onClick={() => setCurrentImage(false)}
      />
      {currentImage !== 0 ? (
        <HiChevronLeft
          className='absolute z-50 w-14 h-14 sm:w-20 sm:h-20 my-auto top-0 bottom-0 -ml-3 sm:-ml-2.5 cursor-pointer transition-transform transform hover:scale-110'
          onClick={previousImage}
        />
      ) : null}
      {currentImage !== images.length - 1 ? (
        <HiChevronRight
          className='absolute z-50 w-14 h-14 sm:w-20 sm:h-20 my-auto top-0 bottom-0 right-0 -mr-3 sm:-mr-2.5 cursor-pointer transition-transform transform hover:scale-110'
          onClick={nextImage}
        />
      ) : null}
      <motion.img
        className='relative h-full w-full object-contain max-w-72xl mx-auto top-1/2s transform -translate-y-1/2s z-40 p-8 sm:p-16'
        src={images[currentImage].url}
        key={currentImage}
        alt=''
        initial={
          firstSkip
            ? false
            : isLeftSkip
            ? { x: 300, opacity: 0 }
            : { x: -300, opacity: 0 }
        }
        animate={{ x: 0, opacity: 1 }}
        // exit={{ x: -300, opacity: 0 }}
      />
      <div className='absolute right-0 bottom-0 mr-4 mb-4 text-xl sm:text-3xl'>{`${
        currentImage + 1
      } of ${images.length}`}</div>
    </motion.div>
  ) : null;
};

const mapStateToProps = (state) => ({
  images: state.preview.images,
  currentImage: state.preview.currentImage,
});

export default connect(mapStateToProps, {
  setCurrentImage,
})(Preview);
