import { RenderFuncProp } from 'types';
import { ReactElement } from 'react';

export interface NavigationListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface NavigationListGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export interface NavigationListGroupActionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  icon: JSX.Element;
}

export interface NavigationListLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  icon?: JSX.Element;
  selected?: boolean;
  badge?: string | number | JSX.Element;
  renderFunc?: RenderFuncProp<
    HTMLAnchorElement,
    NavigationListLinkPropsWithActions
  >;
}

export type NavigationListLinkPropsWithActions = NavigationListLinkProps & {
  actions: ReactElement[];
  level: number;
};

export interface NavigationListLinkActionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  icon: JSX.Element;
}
