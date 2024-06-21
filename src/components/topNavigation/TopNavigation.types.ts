import { Align, RenderFuncProp } from 'types';

export interface TopNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  fixed?: boolean;
}

export interface TopNavigationLogoProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: JSX.Element;
}

export interface TopNavigationGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: Align;
}

export interface TopNavigationLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  selected?: boolean;
  renderFunc?: RenderFuncProp<HTMLAnchorElement, TopNavigationLinkProps>;
}
