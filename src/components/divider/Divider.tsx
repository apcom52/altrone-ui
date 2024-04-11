import { memo } from 'react';
import s from './divider.module.scss';
import clsx from 'clsx';
import { DividerProps } from './Divider.types.ts';

export const Divider = memo<DividerProps>(
  ({ direction, className, ...props }) => {
    const cls = clsx(s.Divider, className);

    return <hr className={cls} {...props} />;
  },
);
