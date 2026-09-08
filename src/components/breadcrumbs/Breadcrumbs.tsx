import { memo } from 'react';
import { BreadcrumbsProps } from './Breadcrumbs.types.ts';
import s from './breadcrumbs.module.scss';
import clsx from 'clsx';
import { Item } from './components';
import { useLocalization } from '../application';

const BreadcrumbsComponent = memo<BreadcrumbsProps>(
  ({ ref, children, className, style, ...restProps }) => {
    const t = useLocalization();
    const cls = clsx(s.Breadcrumbs, className);

    return (
      <nav
        ref={ref}
        className={cls}
        style={style}
        aria-label={t('breadcrumbs.label')}
        {...restProps}
      >
        <ol className={s.List}>{children}</ol>
      </nav>
    );
  },
);

const BreadcrumbsNamespace = Object.assign(BreadcrumbsComponent, {
  Item,
});

export { BreadcrumbsNamespace as Breadcrumbs };
