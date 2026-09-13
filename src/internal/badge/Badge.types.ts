import type { HTMLAttributes, ReactElement, Ref } from 'react';
import type { BoxTone } from 'components/box';

export type BadgePlacement = 'inline' | 'corner';

export type BadgeSize = 'mini' | 's' | 'm' | 'l' | 'xl';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  ref?: Ref<HTMLElement>;
  /** Short count or label. A string/number renders as bold text; an element renders as-is. */
  children: string | number | ReactElement;
  /**
   * `inline` (default) — a translucent pill sitting in a content row.
   * `corner` — an opaque `plate` chip absolutely positioned at the top-right
   * of the nearest positioned ancestor (which must be `position: relative`,
   * as every `Box` is by default).
   */
  placement?: BadgePlacement;
  /** One of the five control tiers; sets height, min-width, padding and text size. */
  size?: BadgeSize;
  /** Fill tone, forwarded to `Box`. Defaults to `neutral`. */
  tone?: BoxTone;
}
