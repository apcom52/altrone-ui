import React from 'react';

export interface SideNavigationProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional heading above the links (e.g. "On this page"). */
  title?: string;
  ref?: React.Ref<HTMLElement>;
}

export interface SideNavigationItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** CSS selector of the target section, e.g. `"#introduction"`. */
  href: string;
  label: string;
  /** Forwarded to the root `<li>`. */
  ref?: React.Ref<HTMLLIElement>;
}
