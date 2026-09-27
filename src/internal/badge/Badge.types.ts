import type { HTMLAttributes, ReactElement, Ref } from 'react';
import type { BoxTone } from 'components/box';
import type { Size } from 'types';

export type BadgeMode = 'inline' | 'corner';

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
  mode?: BadgeMode;
  /** One of the five control tiers; sets height, min-width, padding and text size. */
  size?: Size;
  /** Fill tone, forwarded to `Box`. Defaults to `neutral`. */
  tone?: BoxTone;
}
