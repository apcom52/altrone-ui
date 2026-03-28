import { Size } from 'types';
import React, { ReactElement, ReactNode } from 'react';

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  label: string;
  showLabel?: boolean;
  tooltip?: string | ReactElement;

  icon?: ReactElement;
  additionalIcon?: ReactElement;

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
