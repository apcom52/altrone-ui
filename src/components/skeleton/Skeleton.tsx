import { memo } from 'react';
import s from './skeleton.module.scss';
import { SkeletonProps } from './Skeleton.types';
import { motion } from 'motion/react';

export const Skeleton = memo<SkeletonProps>((props) => {
  const {
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    radius,
    style,
    ...restProps
  } = props;

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

  return (
    <motion.div className={s.Skeleton} style={styles} layout {...restProps} />
  );
});
