interface BaseBreadcrumbLink {
  title: string;
  icon?: JSX.Element;
}

interface WithHref extends BaseBreadcrumbLink {
  href: string;
}

interface WithOnClick extends BaseBreadcrumbLink {
  onClick: () => void;
}

export type BreadcrumbLink = BaseBreadcrumbLink & (WithHref | WithOnClick);

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
