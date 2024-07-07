import { memo } from 'react';
import clsx from 'clsx';
import s from './group.module.scss';
import { NavigationListGroupProps } from '../NavigationList.types.ts';
import { useConfiguration } from 'components/configuration';

export const Group = memo<NavigationListGroupProps>(
  ({ title, children, className, ...restProps }) => {
    const { navigationList: { group: groupConfig } = {} } = useConfiguration();

    const cls = clsx(s.Group, className);
    const titleCls = clsx(s.Title, groupConfig?.titleClassName);

    return (
      <div className={cls} {...restProps}>
        {title ? <div className={titleCls}>{title}</div> : null}
        {children}
      </div>
    );
  },
);
