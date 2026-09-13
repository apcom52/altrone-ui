import { memo } from 'react';
import s from './header.module.scss';
import { NavigationListHeaderProps } from '../NavigationList.types';
import clsx from 'clsx';

/** Always-visible chrome, outside `Scrollable` — never scrolled, so there's no "pinned" state to track. */
export const Header = memo(
  ({ ref, children, className, ...restProps }: NavigationListHeaderProps) => {
    const cls = clsx(s.Header, className);

    return (
      <div ref={ref} className={cls} {...restProps}>
        {children}
      </div>
    );
  },
);
