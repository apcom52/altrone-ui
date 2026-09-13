import { memo } from 'react';
import s from './footer.module.scss';
import { NavigationListFooterProps } from '../NavigationList.types';
import clsx from 'clsx';

/** Always-visible chrome, outside `Scrollable` — never scrolled, so there's no "pinned" state to track. */
export const Footer = memo(
  ({ ref, children, className, ...restProps }: NavigationListFooterProps) => {
    const cls = clsx(s.Footer, className);

    return (
      <div ref={ref} className={cls} {...restProps}>
        {children}
      </div>
    );
  },
);
