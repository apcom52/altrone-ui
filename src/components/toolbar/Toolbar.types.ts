import { ButtonProps } from 'components/button/Button.types';
import { Align, Direction } from 'types';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
}

export interface ToolbarActionProps extends Omit<ButtonProps, 'variant'> {}

export interface ToolbarGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: Align;
  weight?: number;
}

export interface ToolbarLeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface ToolbarCenterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface ToolbarTrailingProps
  extends React.HTMLAttributes<HTMLDivElement> {}
