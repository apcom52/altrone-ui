import React from 'react';

interface TextBaseProps {
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  italic?: boolean;
  underline?: boolean;
  deleted?: boolean;
  highlighted?: boolean;
  code?: boolean;
  kbd?: boolean;
  truncate?: boolean;
  lineClamp?: number;
  align?: 'start' | 'center' | 'end' | 'justify';
  color?: 'success' | 'danger' | 'warning' | 'muted';
  nowrap?: boolean;
}

// Removes TextBaseProps keys from HTML attributes to avoid type conflicts
// (e.g. HTMLAttributes has `color?: string` which clashes with our narrower type)
type WithHTML<
  T extends HTMLElement,
  Attrs extends React.HTMLAttributes<T> = React.HTMLAttributes<T>,
> = TextBaseProps & Omit<Attrs, keyof TextBaseProps>;

// block={true} → <p>
export interface TextBlockProps extends WithHTML<HTMLParagraphElement> {
  block: true;
  list?: never;
  item?: never;
  href?: never;
  asChild?: never;
  ref?: React.Ref<HTMLParagraphElement>;
}

// list="numeric" → <ol>
export interface TextNumericListProps extends WithHTML<HTMLOListElement> {
  list: 'numeric';
  block?: never;
  item?: never;
  href?: never;
  asChild?: never;
  ref?: React.Ref<HTMLOListElement>;
}

// list="marked" → <ul>
export interface TextMarkedListProps extends WithHTML<HTMLUListElement> {
  list: 'marked';
  block?: never;
  item?: never;
  href?: never;
  asChild?: never;
  ref?: React.Ref<HTMLUListElement>;
}

// item={true} → <li>
export interface TextItemProps extends WithHTML<HTMLLIElement> {
  item: true;
  block?: never;
  list?: never;
  href?: never;
  asChild?: never;
  ref?: React.Ref<HTMLLIElement>;
}

// href="..." → <a>
export interface TextLinkProps
  extends
    TextBaseProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof TextBaseProps> {
  href: string;
  /** Automatically adds target="_blank" rel="noopener noreferrer" */
  external?: boolean;
  block?: never;
  list?: never;
  item?: never;
  asChild?: never;
  ref?: React.Ref<HTMLAnchorElement>;
}

// asChild={true} → merges Text props onto the child element
export interface TextAsChildProps extends WithHTML<HTMLElement> {
  asChild: true;
  children: React.ReactElement;
  block?: never;
  list?: never;
  item?: never;
  href?: never;
  ref?: React.Ref<HTMLElement>;
}

// default → <span>
export interface TextDefaultProps extends WithHTML<HTMLSpanElement> {
  block?: false;
  list?: never;
  item?: false;
  href?: never;
  asChild?: never;
  ref?: React.Ref<HTMLSpanElement>;
}

export type TextProps =
  | TextBlockProps
  | TextNumericListProps
  | TextMarkedListProps
  | TextItemProps
  | TextLinkProps
  | TextAsChildProps
  | TextDefaultProps;
