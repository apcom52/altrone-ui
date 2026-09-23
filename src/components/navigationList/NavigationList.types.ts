import React from 'react';
import { ActionsProp } from '../../utils';

export interface NavigationListProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement>;
}

export interface NavigationListGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  title?: string;
  /** Rendered in the group header, next to the title. */
  actions?: ActionsProp;
}

export interface NavigationListLinkActionsContext {
  selected?: boolean;
  disabled?: boolean;
}

export interface NavigationListLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  ref?: React.Ref<HTMLAnchorElement>;
  label: string;
  icon?: React.JSX.Element;
  selected?: boolean;
  badge?: string | number | React.JSX.Element;
  disabled?: boolean;
  asChild?: boolean;
  /** Shown when the item's nested links are expanded. Defaults to a chevron. */
  childrenIcon?: React.JSX.Element;
  /**
   * Rendered next to the label. Clicks/keyboard activation inside `actions`
   * are stopped from bubbling so they don't also trigger the link.
   */
  actions?: ActionsProp<NavigationListLinkActionsContext>;
}

export interface NavigationListHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export interface NavigationListFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}
