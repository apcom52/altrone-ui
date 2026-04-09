import React, { Children, cloneElement, isValidElement, memo } from 'react';
import { BreadcrumbsProps } from './Breadcrumbs.types.ts';
import s from './breadcrumbs.module.scss';
import clsx from 'clsx';
import { Item } from './components';

const BreadcrumbsComponent = memo<BreadcrumbsProps>(
  ({ ref, children, className, style, ...restProps }) => {
    const cls = clsx(s.Breadcrumbs, className);
    const styles = {
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
