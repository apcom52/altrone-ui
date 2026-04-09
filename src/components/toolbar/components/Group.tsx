import { memo } from 'react';
import { ToolbarGroupProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import clsx from 'clsx';
import { motion } from 'motion/react';

export const Group = memo(
  ({
    ref,
    children,
    align = 'start',
    weight,
    className,
    style,
    ...restProps
  }: ToolbarGroupProps) => {
    const cls = clsx(
      s.Group,
      {
        [s.Center]: align === 'center',
        [s.End]: align === 'end',
        [s.Between]: align === 'between',
      },
      className,
    );

    const styles = {
      ...(weight !== undefined && { flex: weight }),
      ...style,
    };

    return (
      <motion.div
        ref={ref}
        layout
        className={cls}
        style={styles}
        {...restProps}
      >
        {children}
      </motion.div>
    );
  },
);
