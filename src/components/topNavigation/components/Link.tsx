import { forwardRef } from 'react';
import { TopNavigationLinkProps } from '../TopNavigation.types.ts';
import clsx from 'clsx';
import s from './link.module.scss';

export const Link = forwardRef<HTMLAnchorElement, TopNavigationLinkProps>(
  (
    { label, className, style, leftIcon, rightIcon, selected, ...restProps },
    ref,
  ) => {
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
          <div className={s.Icon}>{leftIcon}</div>
          {label}
          <div className={s.Icon}>{rightIcon}</div>
        </div>
      </a>
    );
  },
);
