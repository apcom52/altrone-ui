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
import { List } from 'components/list';

const BreadcrumbsComponent = memo<BreadcrumbsProps>(
  ({ children, className, style, ...restProps }) => {
    const { breadcrumbs: breadcrumbsConfig = {} } = useConfiguration();

    const cls = clsx(
      s.BottomNavigation,
      className,
      breadcrumbsConfig.className,
    );
    const styles = {
      ...breadcrumbsConfig.style,
      ...style,
    };

    const validChildren = Children.toArray(children).filter(
      (child) => typeof child === 'object' && isValidElement(child),
    ) as ReactElement[];

    return (
      <div className={cls} style={styles} {...restProps}>
        <List
          className={s.Breadcrumbs}
          data={validChildren}
          gap="m"
          renderItem={({ item, currentIndex }) =>
            cloneElement(item, {
              key: currentIndex,
              current: currentIndex === validChildren.length - 1,
            })
          }
          SeparatorComponent={() => <div className={s.Separator}>/</div>}
        />
      </div>
    );
  },
);

const BreadcrumbsNamespace = Object.assign(BreadcrumbsComponent, {
  Item,
});

export { BreadcrumbsNamespace as Breadcrumbs };
