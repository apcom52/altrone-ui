import React, { ReactElement } from 'react';
import { RenderFuncProp } from '../../types';

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export interface TabsItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string;
  icon?: ReactElement;
  selected?: boolean;
  showLabel?: boolean;
  renderFunc?: RenderFuncProp<HTMLAnchorElement, TabsItemProps>;
  badge?: string | number | ReactElement;
  ref?: React.Ref<HTMLAnchorElement>;
  asChild?: boolean;
  children?: ReactElement;
}
