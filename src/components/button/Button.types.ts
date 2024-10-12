import { RenderFuncProp, Role, Size } from 'types';
import { ReactElement } from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  showLabel?: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  role?: Role;
  severity?: Role;
  size?: Size;
  transparent?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  rainbowEffect?: boolean;
  renderFunc?: RenderFuncProp<HTMLButtonElement, ButtonProps>;
  ariaRole?: string;
  loading?: boolean;
}
