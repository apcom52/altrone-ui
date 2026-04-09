import { memo } from 'react';
import s from './divider.module.scss';
import clsx from 'clsx';
import { DividerProps } from './Divider.types.ts';

export const Divider = memo<DividerProps>(
  ({ ref, direction, className, style, ...props }) => {
    const cls = clsx(
      s.Divider,
      {
        [s.Vertical]: direction === 'vertical',
      },
      className,
    );

    const styles = {
      ...style,
    };

    return <hr ref={ref} className={cls} style={styles} {...props} />;
  },
);
