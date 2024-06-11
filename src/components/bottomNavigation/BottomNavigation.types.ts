import { ReactElement } from 'react';
import { RenderFuncProp } from '../../types';

export interface BottomNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface BottomNavigationItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  icon: ReactElement;
  label: string;
  selected?: boolean;
  renderFunc?: RenderFuncProp<HTMLAnchorElement, BottomNavigationItemProps>;
}
