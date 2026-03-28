import { Size } from 'types';
import { JSX, ReactElement } from 'react';

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  label: string;
  showLabel?: boolean;

  icon?: ReactElement;
  additionalIcon?: ReactElement;

  variant?: 'default' | 'submit' | 'text' | 'action';
  state?: 'idle' | 'loading' | 'successed' | 'failed';
  danger?: boolean;
  size?: Size;
  badge?: number | string | JSX.Element;
  selected?: boolean;

  asChild?: boolean;
  children?: ReactElement;
}
