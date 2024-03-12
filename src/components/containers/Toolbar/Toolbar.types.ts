import { ReactNode } from 'react';
import { Align, Elevation, Indicator, Point, SafeReactElement, Surface } from '../../../types';

export enum ToolbarVariant {
  default = 'default',
  compact = 'compact'
}

export interface ToolbarProps {
  children: SafeReactElement;
  variant?: ToolbarVariant;
  floated?: boolean;
  offset?: Point;
  width?: number | string;
  className?: string;
  surface?: Surface;
  elevation?: Elevation;
  defaultPosition?: Point;
}

export interface ToolbarActionType {
  icon: JSX.Element;
  label?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  danger?: boolean;
  className?: string;
  indicator?: Indicator;
  hideLabel?: boolean;
  children?: ReactNode;
  fluid?: boolean;
  usePressEffect?: boolean;
}

export interface ToolbarGroupProps {
  children: SafeReactElement;
  align?: Align;
  fluid?: boolean;
  className?: string;
}

export interface ToolbarMenuProps {
  children: SafeReactElement;
  className?: string;
}

export interface ToolbarMenuItemProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
}
