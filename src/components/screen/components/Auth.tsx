import { memo } from 'react';
import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenAuthProps } from '../Screen.types.ts';
import { Screen } from '../Screen.tsx';

export const Auth = memo(
  ({
    ref,
    children,
    size = 'mini',
    className,
    style,
    ...restProps
  }: ScreenAuthProps) => (
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
