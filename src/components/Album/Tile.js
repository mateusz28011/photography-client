import { motion } from 'framer-motion';

const Tile = ({ children, clickFunc }) => {
  return (
    <motion.div
      whileHover={
        clickFunc && {
          scale: 1.03,
          transition: { duration: 0.25, ease: 'easeOut' },
        }
      }
      onClick={clickFunc}
      className={
        'bg-white p-3 shadow auto-rows-fr rounded-lg flex flex-col items-center relative text-sm ssm:text-lg' +
        (clickFunc ? ' cursor-pointer ' : '')
      }
    >
      {children}
    </motion.div>
  );
};

export default Tile;
