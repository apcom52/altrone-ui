import { Elevation, Indicator, SafeReactElement, Surface } from '../../../types';
import { ReactElement } from 'react';

export interface NavigationListProps {
  children: SafeReactElement;
  className?: string;
  surface?: Surface;
}

export interface NavigationHeaderProps {
  title: ReactElement | string;
  action?: ReactElement | null;
  className?: string;
}

export interface NavigationMenuProps {
  children: SafeReactElement;
  className?: string;
}

export interface NavigationLinkProps {
  label: string;
  icon?: ReactElement;
  indicator?: Indicator;
  href?: string;
  className?: string;
  active?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  onClick?: () => void;
  children?: SafeReactElement;
}