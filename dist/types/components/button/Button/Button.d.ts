/// <reference types="react" />
import {
  ContextMenuType as ContextMenuType,
  Role,
  Size,
  WithAltroneOffsets,
  WithoutDefaultOffsets
} from '../../../types';
import './button.scss';
export declare enum ButtonVariant {
  default = 0,
  borders = 'borders',
  transparent = 'transparent',
  text = 'text'
}
export interface ButtonProps
  extends Omit<
      WithoutDefaultOffsets<React.HTMLProps<HTMLButtonElement>>,
      'style' | 'target' | 'size'
    >,
    WithAltroneOffsets {
  role?: Role;
  variant?: ButtonVariant;
  href?: string;
  target?: HTMLAnchorElement['target'];
  fluid?: boolean;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  size?: Size;
  dropdown?: ContextMenuType;
  isIcon?: boolean;
}
declare const _default: import('react').MemoExoticComponent<
  import('react').ForwardRefExoticComponent<
    ButtonProps & import('react').RefAttributes<HTMLButtonElement>
  >
>;
export default _default;
