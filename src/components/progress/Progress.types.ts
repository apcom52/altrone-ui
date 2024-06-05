import { Size } from '../../types';
import { ReactElement } from 'react';

export type ProgressContext = {
  value: number;
  max: number;
  percentage: number;
};

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  value: number;
  max: number;
  size?: Size;
  activeSegmentClassName?: string;
  children?:
    | string
    | ReactElement
    | ((context: ProgressContext) => JSX.Element);
}
