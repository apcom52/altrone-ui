import React, { ReactElement } from 'react';

export interface NavigationListProps extends React.HTMLAttributes<HTMLElement> {
  ref?: React.Ref<HTMLElement>;
}

export interface NavigationListGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  title?: string;
}

export interface NavigationListGroupActionProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  ref?: React.Ref<HTMLButtonElement>;
  label: string;
  icon: React.JSX.Element;
}

export interface NavigationListLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLElement>;
  label: string;
  icon?: React.JSX.Element;
  selected?: boolean;
  badge?: string | number | React.JSX.Element;
  disabled?: boolean;
  asChild?: boolean;
}

export interface NavigationListLinkActionProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  ref?: React.Ref<HTMLButtonElement>;
  label: string;
  icon: React.JSX.Element;
}

export interface NavigationListHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export interface NavigationListFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}
