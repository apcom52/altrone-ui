import React from 'react';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  /**
   * Diameter — a number of px or any CSS length (`24`, `'24px'`, `'2rem'`).
   * For a non-px length the stroke scales with it, relative to a 24px circle.
   */
  size?: number | string;
  /** Stroke width in the same units as `size` (`2`, `'1.5'`). */
  strokeWidth?: number | string;
  /** Stroke colour. Any CSS colour; wins over `style.color`, defaults to `--loading-color`. */
  color?: string;
  /**
   * Progress percentage (0–100). When set, the spinner becomes a determinate
   * circular progress indicator (`role="progressbar"`) instead of spinning
   * indefinitely. `NaN` is treated as unset.
   */
  value?: number;
}
