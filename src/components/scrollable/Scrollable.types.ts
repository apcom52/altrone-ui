import type { CSSProperties, HTMLAttributes, Ref } from 'react';

/** Per-axis overflow behaviour, forwarded to OverlayScrollbars. */
type OverflowBehavior =
  | 'scroll'
  | 'hidden'
  | 'visible'
  | 'visible-hidden'
  | 'visible-scroll';

export interface ScrollableProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  /** Per-axis overflow, forwarded to OverlayScrollbars. Both default to `'scroll'`. */
  overflowX?: OverflowBehavior;
  overflowY?: OverflowBehavior;
  /**
   * Caps the scroll box height — it grows with content up to this value and
   * then scrolls. Without it the box fills its parent's height, so the parent
   * must be sized.
   */
  maxHeight?: CSSProperties['maxHeight'];
}
