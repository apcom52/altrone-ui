import { memo } from 'react';
import s from './skeleton.module.scss';
import { SkeletonProps } from './Skeleton.types';
import { motion, type HTMLMotionProps } from 'motion/react';

export const Skeleton = memo<SkeletonProps>(
  ({
    ref,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    radius,
    animateLayout = false,
    style,
    ...restProps
  }) => {
    const styles = {
      ...style,
      width: width ?? '100%',
      minWidth: minWidth ?? width ?? '100%',
      maxWidth: maxWidth ?? width ?? '100%',
      height: height ?? '100%',
      minHeight: minHeight ?? height ?? '100%',
      maxHeight: maxHeight ?? height ?? '100%',
      borderRadius: radius,
    };

    /* Decorative — the loading state itself should be announced by a wrapper
       (`aria-busy` / `role="status"`), not by every placeholder. */
    const common = {
      ref,
      className: s.Skeleton,
      style: styles,
      'aria-hidden': true as const,
      ...restProps,
    };

    return animateLayout ? (
      <motion.div layout {...(common as HTMLMotionProps<'div'>)} />
    ) : (
      <div {...common} />
    );
  },
);
