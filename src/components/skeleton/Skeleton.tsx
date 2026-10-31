import { memo } from 'react';
import clsx from 'clsx';
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
    className,
    style,
    ...restProps
  }) => {
    const styles = {
      width: width ?? '100%',
      minWidth,
      maxWidth,
      height: height ?? '100%',
      /* Without an explicit height `100%` collapses to 0 in an auto-height
         parent, so fall back to one text line. */
      minHeight: minHeight ?? (height === undefined ? '1lh' : undefined),
      maxHeight,
      borderRadius: radius,
      ...style,
    };

    /* Decorative — the loading state itself should be announced by a wrapper
       (`aria-busy` / `role="status"`), not by every placeholder. */
    const common = {
      ref,
      style: styles,
      'aria-hidden': true as const,
      ...restProps,
      className: clsx(s.Skeleton, className),
    };

    return animateLayout ? (
      <motion.div layout {...(common as HTMLMotionProps<'div'>)} />
    ) : (
      <div {...common} />
    );
  },
);
