import React from 'react';
import { Align, Direction, Gap, Justify } from 'types';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLElement>;
  tagName?: keyof React.JSX.IntrinsicElements;
  gap?: Gap;
  direction?: Direction;
  align?: Align;
  justify?: Justify;
  disableInnerMargins?: boolean;
  wrap?: boolean;
}
