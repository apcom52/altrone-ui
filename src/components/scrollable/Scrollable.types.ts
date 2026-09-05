import React from 'react';

type OverflowBehavior =
  | 'scroll'
  | 'hidden'
  | 'visible'
  | 'visible-hidden'
  | 'visible-scroll';

export interface ScrollableProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  /** Per-axis overflow behavior, forwarded to OverlayScrollbars. Defaults to `'scroll'` on both axes. */
  overflowX?: OverflowBehavior;
  overflowY?: OverflowBehavior;
}
