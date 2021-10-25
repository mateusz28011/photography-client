const pageAnimation = {
  initial: { x: '-300px', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: 'anticipate', duration: 0.5 },
  },
  exit: { x: '300px', opacity: 0 },
};

// const pageAnimation = {
//   initial: { y: '-300px', opacity: 0 },
//   animate: {
//     y: 0,
//     opacity: 1,
//     transition: { type: 'spring', duration: 0.5 },
//   },
//   exit: { y: '300px', opacity: 0 },
// };

export default pageAnimation;
