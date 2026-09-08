import { memo } from 'react';
import s from './footer.module.scss';
import { NavigationListFooterProps } from '../NavigationList.types';
import clsx from 'clsx';
import { DOMUtils } from '../../../utils';
import { useStuck } from '../hooks/useStuck.ts';

export const Footer = memo(
  ({ ref, children, className, ...restProps }: NavigationListFooterProps) => {
    const { ref: stuckRef, stuck } = useStuck();
    const cls = clsx(s.Footer, className);

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
