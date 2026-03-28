import React, { ReactElement } from 'react';
import { AnyObject } from 'utils';

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement>;
}

export interface BreadcrumbsItemProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  ref?: React.Ref<HTMLDivElement>;
  label?: string;
  icon?: ReactElement;
  current?: boolean;
  children?: ReactElement<AnyObject>;
  asChild?: boolean;
  /** @internal — выставляется автоматически из Breadcrumbs */
  isLast?: boolean;
}
