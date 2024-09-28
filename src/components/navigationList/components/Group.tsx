import { memo, ReactElement, useMemo } from 'react';
import clsx from 'clsx';
import s from './group.module.scss';
import { NavigationListGroupProps } from '../NavigationList.types.ts';
import { useConfiguration } from 'components/configuration';
import { AltChildren, DOMUtils } from '../../../utils';
import { GroupAction } from './GroupAction.tsx';

export const Group = memo<NavigationListGroupProps>(
  ({ title, children, className, ...restProps }) => {
    const { navigationList: { group: groupConfig } = {} } = useConfiguration();

    const cls = clsx(s.Group, className);
    const titleCls = clsx(s.Title, groupConfig?.titleClassName);

    const [actions, links] = useMemo(() => {
      const actions: ReactElement[] = [];
      const links: ReactElement[] = [];

      const elements = new AltChildren(children);

      elements
        .filterNodes()
        .toArray()
        .forEach((elem) => {
          const element = elem as ReactElement;

          if (DOMUtils.containsElementType(element, GroupAction)) {
            actions.push(element);
          } else {
            links.push(element);
          }
        });

      return [actions, links];
    }, [children]);

    return (
      <div className={cls} {...restProps}>
        <div className={s.Header}>
          {title ? <div className={titleCls}>{title}</div> : null}
          <div className={s.Actions}>{actions}</div>
        </div>
        {links}
      </div>
    );
  },
);
