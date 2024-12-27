import { Children, memo } from 'react';
import { GridProps } from './Grid.types.ts';
import { Column } from './components';
import s from './styles.module.scss';
import clsx from 'clsx';
import { useConfiguration } from '../configuration';

const GridComponent = memo<GridProps>((props) => {
  const { children, wrap = true, className, style, ...restProps } = props;

  const { grid: gridConfig = {} } = useConfiguration();

  const cls = clsx(s.Grid, gridConfig.className, className);
  const styles = {
    ...gridConfig.style,
    ...style,
    '--child-columns': Children.count(children),
  };

  return (
    <div className={cls} style={styles} {...restProps}>
      {children}
    </div>
  );
});

const GridNamespace = Object.assign(GridComponent, {
  Column: Column,
});

export { GridNamespace as Grid };
