import { memo } from 'react';
import s from './dummyBox.module.scss';
import clsx from 'clsx';
import { DummyBoxProps } from './DummyBox.types';
import { useConfiguration } from 'components/configuration';

export const DummyBox = memo((props: DummyBoxProps) => {
  const {
    width = '100%',
    height = '100%',
    className,
    style,
    ...restProps
  } = props;

  const { dummyBox: dummyBoxConfig = {} } = useConfiguration();

  const cls = clsx(s.DummyBox, className, dummyBoxConfig.className);

  const styles = {
    ...dummyBoxConfig.style,
    ...style,
    width,
    height,
  };

  return <div className={cls} style={styles} {...restProps} />;
});
