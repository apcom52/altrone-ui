import { NavigationListProps } from 'components/navigationList/NavigationList.types';
import { ToolbarProps } from 'components/toolbar/Toolbar.types';
import type { HTMLAttributes, ReactElement, Ref } from 'react';

export interface ScreenProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  sidebar?: ReactElement<NavigationListProps>;
  header?: ReactElement<ToolbarProps>;
}
