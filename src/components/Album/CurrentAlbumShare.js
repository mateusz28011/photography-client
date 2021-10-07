import { motion } from 'framer-motion';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { AiOutlineCopy, AiOutlineCheck } from 'react-icons/ai';

const CurrentAlbumShare = ({ albumId }) => {
  const [isCopied, setIsCopied] = useState(false);
  const url = `${window.location.origin}/album/?album=${albumId}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      animate={{ opacity: 1 }}
      layout='position'
      className='mt-2 flex  items-center'
    >
      <a
        href={url}
        className='break-all mx-2 text-sm ssm:text-base font-medium hover:text-blue-600'
      >
        {url}
      </a>
      <motion.div
        className='inline-block'
        whileTap={{
          scale: 1.2,
        }}
      >
        <CopyToClipboard
          text={url}
          onCopy={() => setIsCopied(true)}
          className={
            'rounded-full cursor-pointer p-0.5 ' +
            (isCopied ? 'text-green-600' : 'text-blue-600')
          }
        >
          {isCopied ? (
            <AiOutlineCheck size='2rem' />
          ) : (
            <AiOutlineCopy size='2rem' />
          )}
        </CopyToClipboard>
      </motion.div>
    </motion.div>
  );
};

export default CurrentAlbumShare;
