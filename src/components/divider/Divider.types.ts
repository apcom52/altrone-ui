import { Direction } from 'types';

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLHRElement>, 'children'> {
  direction?: Direction;
}
