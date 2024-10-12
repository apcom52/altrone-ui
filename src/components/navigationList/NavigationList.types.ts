import { RenderFuncProp } from 'types';

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
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string;
  icon?: JSX.Element;
  selected?: boolean;
  renderFunc?: RenderFuncProp<HTMLAnchorElement, NavigationListLinkProps>;
}
