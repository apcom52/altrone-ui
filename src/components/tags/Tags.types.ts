import { AnchorHTMLAttributes, HTMLAttributes, ReactNode, Ref } from 'react';
import { Size } from 'types';

export interface TagsProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  /** One of the five control tiers; scales every item's text size. */
  size?: Size;
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
