import { memo } from 'react';
import clsx from 'clsx';
import s from './group.module.scss';
import { NavigationListGroupProps } from '../NavigationList.types.ts';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const Group = memo<NavigationListGroupProps>(
  ({ title, children, className, ...restProps }) => {
    const { navigationList: navigationListConfig = {} } = useConfiguration();

    const cls = clsx(s.Group, className);
    const titleCls = clsx(s.Title, navigationListConfig);

    return (
      <div className={cls} {...restProps}>
        {title ? <div className={titleCls}>{title}</div> : null}
        {children}
      </div>
    );
  },
);
