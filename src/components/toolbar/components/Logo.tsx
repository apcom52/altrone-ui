import { memo } from 'react';
import clsx from 'clsx';
import { ToolbarLogoProps } from '../Toolbar.types.ts';
import s from './logo.module.scss';

/**
 * Slot for the product mark. Pass an `<svg>` or `<img>` as children — it is
 * sized to a square that tracks the toolbar `size`. Wrap it in an `<a>` (or
 * pass `onClick`) if it should navigate home.
 */
export const Logo = memo(
  ({ ref, children, className, ...restProps }: ToolbarLogoProps) => (
    <div ref={ref} className={clsx(s.Logo, className)} {...restProps}>
      {children}
    </div>
  ),
);
