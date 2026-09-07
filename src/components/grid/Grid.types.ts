import { HTMLAttributes, JSX, Ref } from 'react';
import { Gap } from 'types';

export type GridColumnSize =
  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';

export type GridColumnOffset = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface GridProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  tagName?: keyof JSX.IntrinsicElements;
  wrap?: boolean;
  gap?: Gap;
  rowGap?: Gap;
}

export interface GridColumnProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'size'
> {
  ref?: Ref<HTMLElement>;
  tagName?: keyof JSX.IntrinsicElements;
  size?: GridColumnSize;
  offset?: GridColumnOffset;
}
