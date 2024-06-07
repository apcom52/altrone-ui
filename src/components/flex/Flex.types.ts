import { Align, Direction, Gap } from 'types';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: Gap;
  direction?: Direction;
  align?: Align;
  justify?: Align;
  disableInnerMargins?: boolean;
  wrap?: boolean;
}
