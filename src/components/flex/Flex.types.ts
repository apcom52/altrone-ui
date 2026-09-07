import { HTMLAttributes, JSX, Ref } from 'react';
import { Direction, Gap, Justify } from 'types';

export interface FlexProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  tagName?: keyof JSX.IntrinsicElements;
  gap?: Gap;
  direction?: Direction;
  align?: 'start' | 'center' | 'end';
  justify?: Justify;
  disableInnerMargins?: boolean;
  wrap?: boolean;
}
