export interface NavigationListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface NavigationListGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export interface NavigationListLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string;
  icon?: JSX.Element;
  selected?: boolean;
}
