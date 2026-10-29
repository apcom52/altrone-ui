import { memo } from 'react';
import clsx from 'clsx';
import { Box } from 'components/box';
import type { BadgeProps } from './Badge.types';
import s from './badge.module.scss';

/**
 * Internal counter/label chip shared by `Button`, `Tabs.Item`,
 * `NavigationList.Link`, `BottomNavigation.Link` and `Dropdown.Action`. A `Box`
 * pill; this stylesheet only carries the per-size dimensional tuning `Box`
 * doesn't own (small type, a `min-width` so a 2-digit count stays a capsule)
 * and the `corner` positioning.
 */
export const Badge = memo(
  ({
    ref,
    children,
    className,
    mode = 'inline',
    size = 'm',
    tone = 'neutral',
    ...restProps
  }: BadgeProps) => (
    <Box
      ref={ref}
      shape="pill"
      material={mode === 'corner' ? 'plate' : 'translucent'}
      tone={tone}
      width="auto"
      height="var(--badge-height)"
      padding={{ x: 'var(--badge-padding-x)', y: 0 }}
      className={clsx(
        s.Badge,
        {
          [s.Corner]: mode === 'corner',
          [s.Mini]: size === 'mini',
          [s.Small]: size === 's',
          [s.Large]: size === 'l',
          [s.XLarge]: size === 'xl',
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </Box>
  ),
);
