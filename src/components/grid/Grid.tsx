import { memo } from 'react';
import { GridProps } from './Grid.types.ts';
import { Column } from './components';
import s from './styles.module.scss';
import clsx from 'clsx';
import { Gap } from 'types';

const gapVars: Record<Gap, string> = {
  none: '0px',
  xxs: 'var(--narrow-gap)',
  xs: 'var(--xs-gap)',
  s: 'var(--s-gap)',
  m: 'var(--gap)',
  l: 'var(--l-gap)',
  xl: 'var(--xl-gap)',
  xxl: 'var(--xxl-gap)',
};

const GridComponent = memo<GridProps>(
  ({
    ref,
    children,
    wrap = true,
    gap = 'none',
    rowGap = 'none',
    className,
    style,
    ...restProps
  }) => {
    const cls = clsx(s.Grid, { [s.NoWrap]: !wrap }, className);

    const styles = {
      ...style,
      '--column-spacing': gapVars[gap],
      '--row-spacing': gapVars[rowGap],
    };

    return (
      <div ref={ref} className={cls} style={styles} {...restProps}>
        {children}
      </div>
    );
  },
);

const GridNamespace = Object.assign(GridComponent, {
  Column: Column,
});

export { GridNamespace as Grid };
