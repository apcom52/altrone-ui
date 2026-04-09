import { memo } from 'react';
import { GridColumnProps } from '../Grid.types.ts';
import clsx from 'clsx';
import s from './column.module.scss';

export const Column = memo<GridColumnProps>((props) => {
  const {
    ref,
    size = 'auto',
    offset = 0,
    className,
    style,
    children,
    ...restProps
  } = props;

  const cls = clsx(
    s.Column,
    {
      [s.AutoSize]: size === 'auto',
      [s.Offset]: offset,
    },
    className,
  );

  const styles = {
    ...style,
    '--column-size': size,
    '--column-offset': offset,
  };

  return (
    <div ref={ref} className={cls} style={styles} {...restProps}>
      {children}
    </div>
  );
});
