import { memo } from 'react';
import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenFormProps } from '../Screen.types.ts';
import { Screen } from '../Screen.tsx';

export const Form = memo(
  ({
    ref,
    children,
    size = 's',
    className,
    style,
    ...restProps
  }: ScreenFormProps) => (
    <Screen
      ref={ref}
      size={size}
      className={clsx(s.Form, className)}
      style={style}
      {...restProps}
    >
      {children}
    </Screen>
  ),
);
