import { BasicComponentProps, Role, Size } from 'types';
import { ReactElement } from 'react';

export interface ButtonProps extends BasicComponentProps<HTMLButtonElement> {
  label?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  role?: Role;
  size?: Size;
  transparent?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  rainbowEffect?: boolean;
}
