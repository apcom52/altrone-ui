import { Elevation, Indicator, SafeReactElement, Surface } from '../../../types';
import { ReactElement } from 'react';

export interface NavigationListProps<SelectedPage = unknown> {
  children: SafeReactElement;
  selected?: SelectedPage;
  onChange?: (selectedValue: SelectedPage) => void;
  className?: string;
  surface?: Surface;
  compact?: 'manual' | 'static';
  elevation?: Elevation;
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
