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
  color?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'amber' | 'blue' | 'brown' | 'indigo' | 'pink' | 'purple' | 'red' | 'teal';
  /** `status` adds a pale fill, a border and a colored dot before `children`. */
  variant?: 'solid' | 'soft' | 'outline' | 'status';
  shape?: 'rounded' | 'pill';
  size?: Size;
}