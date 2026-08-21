import { memo } from 'react';
import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenListDetailProps } from '../Screen.types.ts';
import { Screen } from '../Screen.tsx';

export const ListDetail = memo(
  ({
    ref,
    children,
    list,
    detail,
    listWidth,
    className,
    style,
    ...restProps
  }: ScreenListDetailProps) => (
    <Screen ref={ref} className={clsx(s.ListDetail, className)} style={style} {...restProps}>
      {children}
      <Screen.Content className={s.ListDetailContent}>
        <div
          className={s.List}
          style={listWidth ? { width: listWidth } : undefined}
        >
          {list}
        </div>
        <div className={s.Detail}>{detail}</div>
      </Screen.Content>
    </Screen>
  ),
);
