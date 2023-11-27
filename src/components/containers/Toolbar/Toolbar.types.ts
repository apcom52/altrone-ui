import { ReactNode } from 'react';
import { ToolbarMenuProps } from './ToolbarMenu';
import { ContextMenuType, Elevation, Indicator, Point, Surface } from '../../../types';
import { ToolbarPopupActionProps } from './ToolbarAction';

export enum ToolbarVariant {
  default = 'default',
  compact = 'compact'
}

export interface ToolbarProps {
  children: ReactNode | ReactNode[];
  variant?: ToolbarVariant;
  floated?: boolean;
  menu?: ToolbarMenuProps['menu'];
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
  contextMenu?: ContextMenuType;
  content?: (props: ToolbarPopupActionProps) => JSX.Element;
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
