import { BasicComponentProps, Direction } from 'types';

export interface DividerProps
  extends Omit<BasicComponentProps<HTMLHRElement>, 'children'> {
  direction?: Direction;
}
