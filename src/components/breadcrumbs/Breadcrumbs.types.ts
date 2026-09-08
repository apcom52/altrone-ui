import React, { ReactElement } from 'react';
import { AnyObject } from 'utils';

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement>;
}

export interface BreadcrumbsItemProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Forwarded to the item element (the `<div>`, or the `asChild` child). */
  ref?: React.Ref<HTMLElement>;
  label?: string;
  icon?: ReactElement;
  /** The current page — the last item. Renders bold and sets `aria-current="page"`. */
  current?: boolean;
  /**
   * Merge the item's styling/ref/props onto a single child element (e.g. an
   * `<a>` or router `<Link>`) instead of rendering a `<div>`. `label`/`icon`
   * become that element's content.
   */
  asChild?: boolean;
  children?: ReactElement<AnyObject>;
}
