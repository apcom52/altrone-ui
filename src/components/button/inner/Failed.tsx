import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { ReactElement } from 'react';
import s from './failed.module.scss';

interface ButtonFailedIconProps {
  icon?: ReactElement;
}

export const ButtonFailedIcon = ({ icon = <X /> }: ButtonFailedIconProps) => {
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
      {icon}
    </motion.div>
  );
};
