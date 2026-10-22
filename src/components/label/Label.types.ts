import React from 'react';
import { Size } from 'types';

export interface LabelProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement>;
  children: React.ReactNode;
  /**
   * A leading icon. For `variant="status"` it renders inside the status dot
   * instead of next to it; for every other variant it renders before
   * `children`.
   */
  icon?: React.ReactElement;
  color?:
    | 'default'
    | 'primary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'amber'
    | 'blue'
    | 'brown'
    | 'green'
    | 'indigo'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal';
  /** `status` adds a pale fill, a border and a colored dot before `children`. */
  variant?: 'solid' | 'soft' | 'outline' | 'status';
  shape?: 'rounded' | 'pill';
  size?: Size;
  /** Render onto a single child element instead of a `<div>`, e.g. a link. */
  asChild?: boolean;
}
