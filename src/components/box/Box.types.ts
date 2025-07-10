import { Surface, Interaction, Radius } from 'types/entity';

export interface BoxProps extends React.HTMLProps<HTMLDivElement> {
  surface?: Surface;
  interaction?: Interaction;
  radius?: Radius | number;
  dummy?: boolean;
  offset?: number;
  inset?: number;
  shadow?: never;
  width?: number | string;
  height?: number | string;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end';
}
