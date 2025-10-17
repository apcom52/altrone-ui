import { HTMLMotionProps } from 'motion/react';
import { JSX } from 'react';

export interface GlassSurfaceProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  glow?: boolean;
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
  fixed?: boolean;
  cursorSpeed?: number;
  offset?: number | string;
  radius?: number | string;
}
