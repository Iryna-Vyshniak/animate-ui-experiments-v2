'use client';

import { AnimatePresence, motion } from 'framer-motion';

const Modal = () => {
  return (
    <AnimatePresence>
      <div className='modal w-screen h-screen z-50 fixed top-0'>
        <motion.div className='mx-auto max-w-5xl' transition={{ duration: 0.5 }}>
          PLANET
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
