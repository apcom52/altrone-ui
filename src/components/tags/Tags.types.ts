import React from 'react';

export interface TagsProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export interface TagsItemProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  label: string;
  ref?: React.Ref<HTMLAnchorElement>;
  asChild?: boolean;
  children?: React.ReactNode;
}
