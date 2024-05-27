import { memo } from 'react';
import { TopNavigationLogoProps } from '../TopNavigation.types.ts';
import clsx from 'clsx';
import s from './logo.module.scss';

export const Logo = memo<TopNavigationLogoProps>(
  ({ href, children, className, ...restProps }) => {
    const cls = clsx(s.Logo, className);

    return (
      <a className={cls} {...restProps}>
        {children}
      </a>
    );
  },
);
