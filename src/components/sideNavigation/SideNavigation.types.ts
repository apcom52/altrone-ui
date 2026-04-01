import React from 'react';

export interface SideNavigationProps
  extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  ref?: React.Ref<HTMLElement>;
}

export interface SideNavigationItemProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
}

export interface SideNavigationContextType {
  currentItem: string;
  setItem: (id: string) => void;
}
