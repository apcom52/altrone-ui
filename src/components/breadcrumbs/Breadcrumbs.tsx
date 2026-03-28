import React, { Children, cloneElement, isValidElement, memo } from 'react';
import { BreadcrumbsProps } from './Breadcrumbs.types.ts';
import s from './breadcrumbs.module.scss';
import clsx from 'clsx';
import { Item } from './components';
import { useConfiguration } from 'components/configuration';

const BreadcrumbsComponent = memo<BreadcrumbsProps>(
  ({ ref, children, className, style, ...restProps }) => {
    const { breadcrumbs: breadcrumbsConfig = {} } = useConfiguration();

    const cls = clsx(s.Breadcrumbs, className, breadcrumbsConfig.className);
    const styles = {
      ...breadcrumbsConfig.style,
      ...style,
    };

    const items = Children.toArray(children);
    const childrenWithLastMark = items.map((child, index) => {
      if (!isValidElement(child)) return child;
      return cloneElement(child as React.ReactElement<{ isLast?: boolean }>, {
        isLast: index === items.length - 1,
      });
    });

    return (
      <nav ref={ref} className={cls} style={styles} {...restProps}>
        <ol className={s.List}>{childrenWithLastMark}</ol>
      </nav>
    );
  },
);

const BreadcrumbsNamespace = Object.assign(BreadcrumbsComponent, {
  Item,
});

export { BreadcrumbsNamespace as Breadcrumbs };
