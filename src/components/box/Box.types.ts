import { HTMLMotionProps } from 'motion/react';
import { CSSProperties } from 'react';
import { Radius, Side, Shadow } from 'types/entity';
import { HTMLElements } from 'types/types';

export type BoxInteraction =
  | 'focus:outline'
  | 'focus:background'
  | 'focus:shadow'
  | 'focus:scale'
  | 'hover:outline'
  | 'hover:background'
  | 'hover:shadow'
  | 'hover:scale'
  | 'press:outline'
  | 'press:background'
  | 'press:shadow'
  | 'press:scale';

export type BoxSurface =
  | 'default'
  | 'accent'
  | 'accent-faded'
  | 'accent-translucent'
  | 'danger'
  | 'dummy'
  | 'translucent'
  | 'transparent';

export type BoxTagName = keyof HTMLElements;

export type BoxProps<Tag extends keyof HTMLElements> = HTMLMotionProps<Tag> & {
  as?: Tag;
  surface?: BoxSurface;
  interaction?: BoxInteraction[];
  radius?: Radius | number;
  offset?: number;
  inset?: number;
  width?: number | string;
  height?: number | string;
  alignX?: Side;
  alignY?: Side;
  shadow?: Shadow;
  focusable?: boolean | number;
  cursor?: CSSProperties['cursor'];

  contentClassName?: string;
};
