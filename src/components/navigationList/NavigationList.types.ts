import { RenderFuncProp } from 'types';
import { ReactElement } from 'react';
import { JSX } from 'react/jsx-runtime';

export interface NavigationListProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface NavigationListGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export interface NavigationListGroupActionProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  label: string;
  icon: JSX.Element;
}

export interface NavigationListLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  icon?: JSX.Element;
  selected?: boolean;
  badge?: string | number | JSX.Element;
  disabled?: boolean;
  asChild?: boolean;
}

export type NavigationListLinkPropsWithActions = NavigationListLinkProps & {
  actions: ReactElement[];
  level: number;
};

export interface NavigationListLinkActionProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  label: string;
  icon: JSX.Element;
}

export interface NavigationListHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface NavigationListFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
