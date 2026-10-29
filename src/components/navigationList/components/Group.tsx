import { memo } from 'react';
import clsx from 'clsx';
import s from './group.module.scss';
import { NavigationListGroupProps } from '../NavigationList.types.ts';
import { AltChildren } from '../../../utils';
import { Text } from 'components/text/Text.tsx';

export const Group = memo(
  ({
    ref,
    title,
    actions,
    children,
    className,
    style,
    ...restProps
  }: NavigationListGroupProps) => {
    const cls = clsx(s.Group, className);

    const links = new AltChildren(children).filterNodes().toArray();

    const resolvedActions =
      typeof actions === 'function' ? actions(undefined) : actions;
    const hasHeader = Boolean(title) || Boolean(resolvedActions);

    return (
      <div
        ref={ref}
        className={cls}
        style={style}
        role="group"
        aria-label={title}
        {...restProps}
      >
        {hasHeader ? (
          <div className={s.Header}>
            {title ? (
              <Text className={s.Title} size={3} weight="medium" truncate>
                {title}
              </Text>
            ) : null}
            {resolvedActions ? (
              <div className={s.Actions}>{resolvedActions}</div>
            ) : null}
          </div>
        ) : null}
        {links}
      </div>
    );
  },
);
