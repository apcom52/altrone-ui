import { Align, BasicComponentProps, Direction, Offset } from '../../types';

export interface ScrollableProps extends BasicComponentProps {
  direction?: Direction;
  maxWidth?: string;
  maxHeight?: string;
  offset?: number | Offset;
  align?: Align;
  justify?: Align;
  showShadows?: boolean;
}
