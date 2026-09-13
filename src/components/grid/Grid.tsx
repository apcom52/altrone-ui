import { createElement } from 'react';
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

const GridComponent = ({
  ref,
  tagName = 'div',
  children,
  wrap = true,
  gap = 'none',
  rowGap = 'none',
  className,
  style,
  ...restProps
}: GridProps) =>
  createElement(
    tagName,
    {
      ...restProps,
      ref,
      className: clsx(s.Grid, { [s.NoWrap]: !wrap }, className),
      style: {
        ...style,
        '--grid-column-spacing': gapVars[gap],
        '--grid-row-spacing': gapVars[rowGap],
      },
    },
    children,
  );

export const Grid = Object.assign(GridComponent, { Column });
