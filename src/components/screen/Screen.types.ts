import { NavigationListProps } from 'components/navigationList/NavigationList.types';
import { ToolbarProps } from 'components/toolbar/Toolbar.types';
import { ReactElement } from 'react';

export interface ScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar?: ReactElement<NavigationListProps>;
  header?: ReactElement<ToolbarProps>;
}
