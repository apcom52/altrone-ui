import { createElement } from 'react';
import { FlexProps } from './Flex.types.ts';
import clsx from 'clsx';
import s from './flex.module.scss';
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

export const Flex = ({
  ref,
  tagName = 'div',
  children,
  className,
  align,
  justify,
  gap = 'none',
  direction = 'horizontal',
  style,
  disableInnerMargins = true,
  wrap = false,
  ...restProps
}: FlexProps) =>
  createElement(
    tagName,
    {
      ...restProps,
      ref,
      className: clsx(
        s.Flex,
        {
          [s.Flex_horizontal]: direction === 'horizontal',
          [s.Flex_alignStart]: align === 'start',
          [s.Flex_alignCenter]: align === 'center',
          [s.Flex_alignEnd]: align === 'end',
          [s.Flex_justifyStart]: justify === 'start',
          [s.Flex_justifyCenter]: justify === 'center',
          [s.Flex_justifyEnd]: justify === 'end',
          [s.Flex_justifyBetween]: justify === 'between',
          [s.Flex_disableInnerMargins]: disableInnerMargins,
          [s.Flex_wrap]: wrap,
        },
        className,
      ),
      style: {
        ...style,
        gap: gapVars[gap],
      },
    },
    children,
  );
