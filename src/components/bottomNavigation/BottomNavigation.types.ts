import React, { ReactElement } from 'react';
import { RenderFuncProp } from '../../types';

export interface BottomNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  floating?: boolean;
}

export interface BottomNavigationItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  ref?: React.Ref<HTMLAnchorElement>;
  icon: ReactElement;
  label: string;
  selected?: boolean;
  renderFunc?: RenderFuncProp<HTMLAnchorElement, BottomNavigationItemProps>;
  badge?: string | number | ReactElement;
}
