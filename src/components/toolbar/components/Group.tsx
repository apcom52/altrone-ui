import { memo } from 'react';
import { ToolbarGroupProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import clsx from 'clsx';
import { motion } from 'motion/react';
import { useToolbarContext } from '../Toolbar.context.ts';

export const Group = memo(
  ({
    ref,
    children,
    align = 'start',
    weight,
    variant,
    className,
    style,
    ...restProps
  }: ToolbarGroupProps) => {
    const ctx = useToolbarContext();
    const resolvedVariant = variant ?? ctx.variant;

    const cls = clsx(
      s.Group,
      {
        [s.Pill]: resolvedVariant !== 'plain',
        [s.AlignCenter]: align === 'center',
        [s.AlignEnd]: align === 'end',
        [s.AlignBetween]: align === 'between',
      },
      className,
    );

    const styles = {
      ...(weight !== undefined && { flex: weight }),
      ...style,
    };

    return (
      <motion.div ref={ref} className={cls} style={styles} {...restProps}>
        {children}
      </motion.div>
    );
  },
);
