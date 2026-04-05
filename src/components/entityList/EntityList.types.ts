import React, { ReactElement, ReactNode } from "react";

export interface EntityListProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  selectable?: boolean;
}

export interface EntityListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'subtitle' | 'meta' | 'onSelect'> {
  ref?: React.Ref<HTMLDivElement>;
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  icon?: ReactElement;
  disabled?: boolean;
  onSelect?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  asChild?: boolean;
}
