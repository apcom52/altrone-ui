import { ReactElement, ReactNode } from "react";

export interface EntityListProps extends React.HTMLAttributes<HTMLDivElement> {
  selectable?: boolean;
}

export interface EntityListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'subtitle' | 'meta' | 'islands' | 'onSelect'> {
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  icon?: ReactElement;
  islands?: ReactNode[];
  disabled?: boolean;
  onSelect?: (checked: boolean) => void;
  asChild?: boolean;
}