import { memo } from 'react';
import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenSettingsProps } from '../Screen.types.ts';
import { Screen } from '../Screen.tsx';

export const Settings = memo(
  ({
    ref,
    children,
    size = 's',
    className,
    style,
    ...restProps
  }: ScreenSettingsProps) => (
    <Screen
      ref={ref}
      size={size}
      className={clsx(s.Settings, className)}
      style={style}
      {...restProps}
    >
      {children}
    </Screen>
  ),
);
