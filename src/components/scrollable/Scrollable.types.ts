import { Align, Direction, Offset } from '../../types';

export interface ScrollableProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
  maxWidth?: string;
  maxHeight?: string;
  offset?: number | Offset;
  align?: Align;
  justify?: Align;
  showShadows?: boolean;
}
