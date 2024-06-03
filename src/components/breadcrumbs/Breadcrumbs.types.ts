import { ReactElement } from 'react';

export interface BreadcrumbsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface BreadcrumbsItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string;
  icon?: ReactElement;
  current?: boolean;
}
