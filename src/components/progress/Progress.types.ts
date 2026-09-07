import { HTMLAttributes, ReactNode, Ref } from 'react';
import { Size } from 'types';

export type ProgressContext = {
  value: number;
  min: number;
  max: number;
  /** `Math.round((value - min) / (max - min) * 100)`, clamped to 0–100. */
  percentage: number;
};

export interface ProgressProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  ref?: Ref<HTMLDivElement>;
  /** Lower bound of the range. Default `0`. */
  min?: number;
  /** Current value. Default `0`. */
  value?: number;
  /** Upper bound of the range. Default `100`. */
  max?: number;
  size?: Size;
  activeSegmentClassName?: string;
  /**
   * Label content. Omit for the default `"{percentage}%"`. A render function
   * receives `{ value, min, max, percentage }`. A non-string label carries no
   * accessible name — pass `aria-label` when using one.
   */
  children?: ReactNode | ((context: ProgressContext) => ReactNode);
}
