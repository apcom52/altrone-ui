import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import s from './success.module.scss';

export const ButtonSuccessIcon = () => {
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
      <Check />
    </motion.div>
  );
};
