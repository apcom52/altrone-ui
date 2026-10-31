import { isValidElement, ReactElement, Ref } from 'react';
import { GridProps } from './Grid.types.ts';
import { Column } from './components';
import s from './styles.module.scss';
import clsx from 'clsx';
import { Gap } from 'types';
import { Slot } from 'utils/components/Slot';
import { AnyObject } from 'utils/types';

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

const GridComponent = ({
  ref,
  asChild = false,
  children,
  wrap = true,
  gap = 'none',
  rowGap = 'none',
  className,
  style,
  ...restProps
}: GridProps) => {
  const cls = clsx(s.Grid, { [s.NoWrap]: !wrap }, className);
  const styles = {
    ...style,
    '--grid-column-spacing': gapVars[gap],
    '--grid-row-spacing': gapVars[rowGap],
  };

  if (asChild) {
    if (!isValidElement(children)) {
      console.error(
        '[Grid] asChild requires a single valid React element as children',
      );
      return null;
    }
    return (
      <Slot ref={ref} className={cls} style={styles} {...restProps}>
        {children as ReactElement<AnyObject>}
      </Slot>
    );
  }

  return (
    <div ref={ref as Ref<HTMLDivElement>} className={cls} style={styles} {...restProps}>
      {children}
    </div>
  );
};

export const Grid = Object.assign(GridComponent, { Column });
