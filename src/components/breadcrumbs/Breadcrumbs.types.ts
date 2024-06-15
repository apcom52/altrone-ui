import { ReactElement } from 'react';
import { RenderFuncProp } from '../../types';

export interface BreadcrumbsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface BreadcrumbsItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string;
  icon?: ReactElement;
  current?: boolean;
  renderFunc?: RenderFuncProp<HTMLAnchorElement, BreadcrumbsItemProps>;
}
