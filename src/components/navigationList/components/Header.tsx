import { memo } from 'react';
import s from './header.module.scss';
import { NavigationListHeaderProps } from '../NavigationList.types';
import clsx from 'clsx';
import { DOMUtils } from '../../../utils';
import { useStuck } from '../hooks/useStuck.ts';

export const Header = memo(
  ({ ref, children, className, ...restProps }: NavigationListHeaderProps) => {
    const { ref: stuckRef, stuck } = useStuck();
    const cls = clsx(s.Header, className);

    return (
      <div
        ref={DOMUtils.composeRefs(ref, stuckRef)}
        className={cls}
        data-stuck={stuck || undefined}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);
