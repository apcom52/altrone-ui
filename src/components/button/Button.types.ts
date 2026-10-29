import { Size } from 'types';
import React, { ReactElement, ReactNode } from 'react';

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  label: string;
  showLabel?: boolean;
  tooltip?: string | ReactElement;
  /** Shortcut badge for the auto-tooltip shown when `showLabel` is false. */
  kbd?: string;

  icon?: ReactElement;
  additionalIcon?: ReactElement;
  /** Icon shown when `state` is `'succeeded'`. Defaults to a checkmark. */
  successIcon?: ReactElement;
  /** Icon shown when `state` is `'failed'`. Defaults to an X. */
  failedIcon?: ReactElement;

  variant?: 'default' | 'submit' | 'text';
  state?: 'idle' | 'loading' | 'succeeded' | 'failed';
  danger?: boolean;
  size?: Size;
  badge?: number | string | ReactElement;
  selected?: boolean;

  asChild?: boolean;
  children?: ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}
