import { memo } from 'react';
import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenEmptyProps } from '../Screen.types.ts';
import { Screen } from '../Screen.tsx';

export const Empty = memo(
  ({
    ref,
    children,
    size = 's',
    className,
    style,
    ...restProps
  }: ScreenEmptyProps) => (
    <Screen
      ref={ref}
      size={size}
      className={clsx(s.Centered, className)}
      style={style}
      {...restProps}
    >
      {children}
    </Screen>
  ),
);
