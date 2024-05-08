import { Align, Direction, Gap, BasicComponentProps } from 'types';
import { PropsWithChildren } from 'react';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: Gap;
  direction?: Direction;
  align?: Align;
  justify?: Align;
  disableInnerMargins?: boolean;
  wrap?: boolean;
}
