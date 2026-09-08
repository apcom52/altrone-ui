import { memo, ReactElement, useMemo } from 'react';
import clsx from 'clsx';
import s from './group.module.scss';
import { NavigationListGroupProps } from '../NavigationList.types.ts';
import { AltChildren, DOMUtils } from '../../../utils';
import { GroupAction } from './GroupAction.tsx';
import { Text } from 'components/text/Text.tsx';

export const Group = memo(
  ({
    ref,
    title,
    children,
    className,
    style,
    ...restProps
  }: NavigationListGroupProps) => {
    const cls = clsx(s.Group, className);

    const [actions, links] = useMemo(() => {
      const actions: ReactElement[] = [];
      const links: ReactElement[] = [];

      new AltChildren(children)
        .filterNodes()
        .toArray()
        .forEach((elem) => {
          const element = elem as ReactElement;
          if (DOMUtils.containsElementType(element, [GroupAction])) {
            actions.push(element);
          } else {
            links.push(element);
          }
        });

      return [actions, links];
    }, [children]);

    const hasHeader = Boolean(title) || actions.length > 0;

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
            {actions.length ? <div className={s.Actions}>{actions}</div> : null}
          </div>
        ) : null}
        {links}
      </div>
    );
  },
);
