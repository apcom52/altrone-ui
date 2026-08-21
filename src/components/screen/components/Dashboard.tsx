import { memo } from 'react';
import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenDashboardProps } from '../Screen.types.ts';
import { Screen } from '../Screen.tsx';

export const Dashboard = memo(
  ({ ref, children, className, style, ...restProps }: ScreenDashboardProps) => (
    <Screen ref={ref} className={clsx(s.Dashboard, className)} style={style} {...restProps}>
      {children}
    </Screen>
  ),
);
