import { ReactElement } from 'react';
import { AnyObject } from 'utils';

export interface BreadcrumbsProps
  extends React.HTMLAttributes<HTMLDivElement> { }

export interface BreadcrumbsItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  label?: string;
  icon?: ReactElement;
  current?: boolean;
  children?: ReactElement<AnyObject>;
  asChild?: boolean;
  onClick?: () => void;
}
