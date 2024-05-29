export interface SideNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export interface SideNavigationItemProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  label: string;
  selector?: string;
}

export interface SideNavigationContextType {
  currentItem: string;
  setItem: (id: string) => void;
}
