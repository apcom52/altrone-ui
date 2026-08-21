import { memo } from 'react';
import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenErrorProps } from '../Screen.types.ts';
import { Screen } from '../Screen.tsx';

export const Error = memo(
  ({
    ref,
    children,
    size = 's',
    className,
    style,
    ...restProps
  }: ScreenErrorProps) => (
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
