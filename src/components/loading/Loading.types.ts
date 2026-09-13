import React from 'react';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  /** Diameter — a number of px or a px string (`24`, `'24px'`). */
  size?: number | string;
  /** Stroke width in the same units as `size` (`2`, `'1.5'`). */
  strokeWidth?: number | string;
  /** Stroke colour. Any CSS colour; defaults to `--loading-color`. */
  color?: string;
}
