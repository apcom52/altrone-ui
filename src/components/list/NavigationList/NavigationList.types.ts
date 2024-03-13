import { Elevation, SafeReactElement, Surface } from '../../../types';

export interface NavigationListProps<SelectedPage = unknown> {
  children: SafeReactElement;
  selected?: SelectedPage;
  onChange?: (selectedValue: SelectedPage) => void;
  className?: string;
  surface?: Surface;
  compact?: 'manual' | 'static';
  elevation?: Elevation;
}
