import React from 'react';

export interface SkeletonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  ref?: React.Ref<HTMLDivElement>;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  radius?: string;
  /**
   * Smoothly animate size/position changes with `motion`'s `layout`. Off by
   * default — a static placeholder doesn't need the per-render FLIP measuring.
   */
  animateLayout?: boolean;
}
