import { ButtonProps } from 'components/button/Button.types';
import { Align } from 'types';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?: 'top' | 'bottom' | 'left' | 'right';
  showBackdrop?: boolean;
  fixed?: boolean;
}

export interface ToolbarActionProps extends Omit<ButtonProps, 'variant'> {
  kbd?: string;
}

export interface ToolbarTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  clickable?: boolean;
}

export interface ToolbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: Align;
  weight?: number;
}

export interface ToolbarLeadingProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ToolbarCenterProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface ToolbarTrailingProps extends React.HTMLAttributes<HTMLDivElement> {}
