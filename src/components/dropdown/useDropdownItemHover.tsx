import { useState } from 'react';
import { motion } from 'motion/react';
import s from './components/action.module.scss';
import { usePopoverCurrentId } from 'components/popover/Popover';

export const useDropdownItemHover = () => {
  const [isHovering, setIsHovering] = useState(false);
  const popoverId = usePopoverCurrentId();

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const element = isHovering ? (
    <motion.div
      layoutId={`dropdown-item-bg-${popoverId}`}
      className={s.ItemBackground}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
    />
  ) : null;

  return {
    itemBackgroundElement: element,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
};
