import React from 'react';

export interface SkeletonProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  ref?: React.Ref<HTMLDivElement>;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  height?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  radius?: string | number;
  /**
   * Smoothly animate size/position changes with `motion`'s `layout`. Off by
   * default — a static placeholder doesn't need the per-render FLIP measuring.
   */
  animateLayout?: boolean;
}
