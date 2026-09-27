import { HTMLAttributes, Ref } from 'react';
import { Orientation, Gap, Align, Justify } from 'types';

export interface FlexProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  /** Merge Flex's computed className/style onto the single child element instead of rendering a `<div>`. */
  asChild?: boolean;
  gap?: Gap;
  orientation?: Orientation;
  align?: Align;
  justify?: Justify;
  disableInnerMargins?: boolean;
  wrap?: boolean;
}
