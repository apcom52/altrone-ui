import { memo } from 'react';
import s from './divider.module.scss';
import clsx from 'clsx';
import { DividerProps } from './Divider.types.ts';
import { Direction } from '../../types';

export const Divider = memo<DividerProps>(
  ({ direction, className, ...props }) => {
    const cls = clsx(
      s.Divider,
      {
        [s.Vertical]: direction === Direction.vertical,
      },
      className,
    );

    return <hr role="separator" className={cls} {...props} />;
  },
);
