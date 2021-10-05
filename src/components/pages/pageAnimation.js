const pageAnimation = {
  initial: { x: '-50%', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', duration: 0.5 },
  },
  exit: { x: '50%', opacity: 0 },
};

export default pageAnimation;
