import { DraggablePosition, DraggableProps } from './Draggable.types';
import { motion, useDragControls } from 'framer-motion';
import './draggable.scss';
import { useRef } from 'react';
import clsx from 'clsx';

export const Draggable = ({
  renderElement,
  width = '100%',
  height = '100%',
  position = DraggablePosition.local,
  className
}: DraggableProps) => {
  const dragControls = useDragControls();

  const parentContainer = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className={clsx('alt-draggable-container', className, {
        'alt-draggable-container--global': position === DraggablePosition.screen
      })}
      ref={parentContainer}
      style={{ width, height }}>
      {renderElement({
        drag: true,
        dragControls,
        whileDrag: { scale: 1.025 },
        whileTap: { boxShadow: 'var(--flyingElevation)', cursor: 'grabbing' },
        whileHover: { cursor: 'grab' },
        dragConstraints: parentContainer,
        dragElastic: 0.15,
        dragMomentum: false
      })}
    </motion.div>
  );
};
