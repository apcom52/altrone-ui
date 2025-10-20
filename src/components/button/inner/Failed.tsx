import { X } from 'lucide-react';
import { motion } from 'motion/react';
import s from './failed.module.scss';

export const ButtonFailedIcon = () => {
  return (
    <motion.div
      className={s.Failed}
      initial={{
        opacity: 0,
        scale: 0.5,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{ opacity: 1, scale: 1, translateX: '-50%', translateY: '-50%' }}
    >
      <X />
    </motion.div>
  );
};
