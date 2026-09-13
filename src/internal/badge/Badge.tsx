import { memo } from 'react';
import clsx from 'clsx';
import { Box } from 'components/box';
import type { BadgeProps } from './Badge.types';
import s from './badge.module.scss';

/**
 * Internal counter/label chip shared by `Button`, `Tabs.Item`,
 * `NavigationList.Link`, `BottomNavigation.Item` and `Dropdown.Action`. A `Box`
 * pill; this stylesheet only carries the per-size dimensional tuning `Box`
 * doesn't own (small type, a `min-width` so a 2-digit count stays a capsule)
 * and the `corner` positioning.
 */
export const Badge = memo(
  ({
    ref,
    children,
    className,
    placement = 'inline',
    size = 'm',
    tone = 'neutral',
    ...restProps
  }: BadgeProps) => (
    <Box
      ref={ref}
      shape="pill"
      material={placement === 'corner' ? 'plate' : 'translucent'}
      tone={tone}
      width="auto"
      height="var(--badge-height)"
      padding={{ x: 'var(--badge-padding-x)', y: 0 }}
      className={clsx(
        s.Badge,
        {
          [s.Corner]: placement === 'corner',
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
