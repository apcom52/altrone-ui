import { AnchorHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react';

export interface TagsProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

export interface TagsItemProps extends Omit<
  AnchorHTMLAttributes<HTMLElement>,
  'children'
> {
  label: string;
  ref?: Ref<HTMLElement>;
  /** Merge the tag styling onto a single child element (Slot). Use for router links. */
  asChild?: boolean;
  children?: ReactNode;
}
