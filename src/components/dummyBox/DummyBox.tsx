import { memo } from 'react';
import s from './dummyBox.module.scss';
import clsx from 'clsx';
import { DummyBoxProps } from './DummyBox.types';

export const DummyBox = memo<DummyBoxProps>((props) => {
  const {
    ref,
    width = '100%',
    height = '100%',
    className,
    style,
    radius = '6px',
    ...restProps
  } = props;

  const cls = clsx(s.DummyBox, className);

  const styles = {
    ...style,
    width,
    minWidth: width,
    height,
    minHeight: height,
    borderRadius: radius,
  };

  return <div ref={ref} className={cls} style={styles} {...restProps} />;
});
