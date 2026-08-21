import { memo } from 'react';
import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenDataViewProps } from '../Screen.types.ts';
import { Screen } from '../Screen.tsx';

export const DataView = memo(
  ({ ref, children, className, style, ...restProps }: ScreenDataViewProps) => (
    <Screen ref={ref} className={clsx(s.DataView, className)} style={style} {...restProps}>
      {children}
    </Screen>
  ),
);
