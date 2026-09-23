import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { ReactElement } from 'react';
import s from './success.module.scss';

interface ButtonSuccessIconProps {
  icon?: ReactElement;
}

export const ButtonSuccessIcon = ({ icon = <Check /> }: ButtonSuccessIconProps) => {
  return (
    <motion.div
      className={s.Success}
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
