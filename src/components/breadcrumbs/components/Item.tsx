import { forwardRef } from 'react';
import { BreadcrumbsItemProps } from '../Breadcrumbs.types.ts';
import clsx from 'clsx';
import s from './item.module.scss';

export const Item = forwardRef<HTMLAnchorElement, BreadcrumbsItemProps>(
  (props, ref) => {
    const { icon, label, className, current, ...restProps } = props;

    const cls = clsx(
      s.Item,
      {
        [s.Current]: current,
      },
      className,
    );

    return (
      <a ref={ref} className={cls} {...restProps}>
        {icon ? <div className={s.Icon}>{icon}</div> : null}
        <div className={s.Label}>{label}</div>
      </a>
    );
  },
);
