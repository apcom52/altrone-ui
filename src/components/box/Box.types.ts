import { Surface, Interaction, Radius } from 'types/entity';

export interface BoxProps extends React.HTMLProps<HTMLDivElement> {
  surface?: Surface;
  interaction?: Interaction;
  radius?: Radius | number;
  dummy?: boolean;
  offset?: number;
  inset?: number;
  width?: number | string;
  height?: number | string;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end';
  shadow?: 'none' | '1' | '2' | '3' | '4' | '5' | '6';
}
