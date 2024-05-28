import { forwardRef } from 'react';
import clsx from 'clsx';
import s from './link.module.scss';
import { NavigationListLinkProps } from '../NavigationList.types.ts';

export const Link = forwardRef<HTMLAnchorElement, NavigationListLinkProps>(
  ({ label, className, style, icon, selected, ...restProps }, ref) => {
    const cls = clsx(
      s.Link,
      {
        [s.Selected]: selected,
      },
      className,
    );

    return (
      <a className={cls} ref={ref} {...restProps}>
        <div className={s.Label}>
          {icon ? <div className={s.Icon}>{icon}</div> : null}
          {label}
        </div>
      </a>
    );
  },
);
