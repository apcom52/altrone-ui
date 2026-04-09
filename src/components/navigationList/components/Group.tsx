import { memo, ReactElement, useMemo } from 'react';
import clsx from 'clsx';
import s from './group.module.scss';
import { NavigationListGroupProps } from '../NavigationList.types.ts';
import { AltChildren, DOMUtils } from '../../../utils';
import { GroupAction } from './GroupAction.tsx';

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
    const titleCls = clsx(s.Title);

    const styles = {
      ...style,
    };

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

    return (
      <div ref={ref} className={cls} style={styles} {...restProps}>
        <div className={s.Header}>
          {title ? <div className={titleCls}>{title}</div> : null}
          <div className={s.Actions}>{actions}</div>
        </div>
        {links}
      </div>
    );
  },
);
