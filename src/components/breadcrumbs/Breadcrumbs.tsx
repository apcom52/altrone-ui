import {
  Children,
  cloneElement,
  isValidElement,
  memo,
  ReactElement,
} from 'react';
import { BreadcrumbsProps } from './Breadcrumbs.types.ts';
import s from './breadcrumbs.module.scss';
import clsx from 'clsx';
import { Item } from './components';
import { useConfiguration } from 'components/configuration';
import { Flex } from 'components/flex/Flex.tsx';

const BreadcrumbsComponent = memo<BreadcrumbsProps>(
  ({ children, className, style, ...restProps }) => {
    const { breadcrumbs: breadcrumbsConfig = {} } = useConfiguration();

    const cls = clsx(s.Breadcrumbs, className, breadcrumbsConfig.className);
    const styles = {
      ...breadcrumbsConfig.style,
      ...style,
    };

    return (
      <nav className={cls} style={styles} {...restProps}>
        <ol className={s.List}>
          {children}
        </ol>
      </nav>
    );
  }
);

const BreadcrumbsNamespace = Object.assign(BreadcrumbsComponent, {
  Item,
});

export { BreadcrumbsNamespace as Breadcrumbs };
