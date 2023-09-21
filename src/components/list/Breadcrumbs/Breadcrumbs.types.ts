export type BreadcrumbLink = {
  title: string;
  icon?: JSX.Element;
  onClick?: () => void;
  href?: string;
};

export interface BreadcrumbsProps {
  links?: BreadcrumbLink[];
  className?: string;
  collapsible?: boolean;
  disabled?: boolean;
  showHomeLink?: boolean;
  HomeComponent?: () => JSX.Element;
  onHomeClick?: () => void;
  homepageHref?: string;
}
