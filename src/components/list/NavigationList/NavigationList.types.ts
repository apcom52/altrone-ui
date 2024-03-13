import { Elevation, SafeReactElement, Surface } from '../../../types';
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
