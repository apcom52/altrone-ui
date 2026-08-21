import React from 'react';
import { ButtonProps } from 'components/button/Button.types';
import { Align } from 'types';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  showBackdrop?: boolean;
  fixed?: boolean;
}

export interface ToolbarActionProps extends Omit<ButtonProps, 'variant'> {
  ref?: React.Ref<HTMLButtonElement>;
  kbd?: string;
}

export interface ToolbarBackActionProps
  extends Omit<ToolbarActionProps, 'label' | 'icon' | 'showLabel'> {
  showLabel?: boolean;
}

export interface ToolbarSearchActionProps
  extends Omit<ToolbarActionProps, 'label' | 'icon' | 'showLabel'> {
  showLabel?: boolean;
}

export interface ToolbarSidebarToggleActionProps
  extends Omit<ToolbarActionProps, 'label' | 'icon' | 'showLabel'> {
  /** Current sidebar state — controlled, this component holds no state of its own. */
  collapsed: boolean;
  showLabel?: boolean;
}

export interface ToolbarBackForwardActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  onBack: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onForward: (event: React.MouseEvent<HTMLButtonElement>) => void;
  backDisabled?: boolean;
  forwardDisabled?: boolean;
}

export interface ToolbarTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  label: string;
  clickable?: boolean;
}

export interface ToolbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  align?: Align;
  weight?: number;
}

export interface ToolbarLeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export interface ToolbarCenterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export interface ToolbarTrailingProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}
