import { DraggablePosition, DraggableProps } from './Draggable.types';
import { motion, useDragControls } from 'framer-motion';
import './draggable.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export const Draggable = ({
  children,
  width = '100%',
  height = '100%',
  position = DraggablePosition.local,
  className
}: DraggableProps) => {
  const dragControls = useDragControls();

  const [parentElement, setParentElement] = useState<HTMLDivElement | null>(null);

  const parentContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setParentElement(parentContainer.current);
  }, [parentContainer.current]);

  return (
    <motion.div
      className={clsx('alt-draggable-container', className, {
        'alt-draggable-container--global': position === DraggablePosition.screen
      })}
      ref={parentContainer}
      style={{ width, height }}>
      {parentElement && (
        <motion.div
          dragControls={dragControls}
          drag
          className="alt-draggable"
          whileDrag={{ scale: 1.025 }}
          dragConstraints={parentContainer}
          dragElastic={0.15}
          dragMomentum={false}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};
