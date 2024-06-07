import { memo } from 'react';
import { TopNavigationGroupProps } from '../TopNavigation.types.ts';
import clsx from 'clsx';
import s from './group.module.scss';

export const Group = memo<TopNavigationGroupProps>(
  ({ align, children, className, ...restProps }) => {
    const cls = clsx(
      s.Group,
      {
        [s.Centered]: align === 'center',
        [s.End]: align === 'end',
      },
      className,
    );

    return (
      <div className={cls} {...restProps}>
        {children}
      </div>
    );
  },
);
