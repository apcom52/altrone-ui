import { Size } from 'types';
import { JSX, ReactElement } from 'react';
import { LoadingState } from 'types/entity';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  label: string;
  showLabel?: boolean;

  icon?: ReactElement;
  additionalIcon?: ReactElement;

  type?: 'default' | 'primary' | 'secondary';
  htmlType?: 'button' | 'submit' | 'reset';
  danger?: boolean;

  size?: Size;
  loading?: boolean;
  badge?: number | string | JSX.Element;
  skeleton?: LoadingState;
}
