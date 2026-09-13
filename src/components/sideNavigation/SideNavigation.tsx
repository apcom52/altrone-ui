import { memo, useId } from 'react';
import s from './sideNavigation.module.scss';
import { SideNavigationProps } from './SideNavigation.types.ts';
import { Item } from './components';
import { ScrollSpy } from '../../utils/components/ScrollSpy.tsx';
import { Text } from 'components/text/Text.tsx';
import clsx from 'clsx';

const SideNavigationComponent = memo<SideNavigationProps>(
  ({ title, children, className, style, ref, ...restProps }) => {
    const titleId = useId();
    const cls = clsx(s.SideNavigation, className);

    return (
      <nav
        className={cls}
        style={style}
        ref={ref}
        aria-labelledby={title ? titleId : undefined}
        {...restProps}
      >
        {title ? (
          <Text id={titleId} className={s.Title} size={4} weight="medium" block>
            {title}
          </Text>
        ) : null}
        <ul className={s.Menu}>
          <ScrollSpy>{children}</ScrollSpy>
        </ul>
      </nav>
    );
  },
);

const SideNavigationNamespace = Object.assign(SideNavigationComponent, {
  Item,
});

export { SideNavigationNamespace as SideNavigation };
