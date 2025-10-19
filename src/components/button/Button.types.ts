import { Size } from 'types';
import { JSX, ReactElement } from 'react';
import { LoadingState } from 'types/entity';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  showLabel?: boolean;

  icon?: ReactElement;
  additionalIcon?: ReactElement;

  variant?: 'default' | 'submit' | 'text' | 'action';
  state?: 'idle' | 'loading' | 'successed' | 'failed';
  danger?: boolean;
  size?: Size;
  badge?: number | string | JSX.Element;
  skeleton?: LoadingState;
}
