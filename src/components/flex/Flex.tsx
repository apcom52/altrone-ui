import { createElement, memo } from 'react';
import { FlexProps } from './Flex.types.ts';
import clsx from 'clsx';
import s from './flex.module.scss';
import { useConfiguration } from 'components/configuration';
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

export const Flex = memo<FlexProps>(
  ({
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
    ...props
  }) => {
    const { flex: flexConfig = {} } = useConfiguration();

    const cls = clsx(
      s.Flex,
      {
        [s.Flex_alignStart]: align === 'start',
        [s.Flex_alignCenter]: align === 'center',
        [s.Flex_alignEnd]: align === 'end',
        [s.Flex_justifyStart]: justify === 'start',
        [s.Flex_justifyCenter]: justify === 'center',
        [s.Flex_justifyEnd]: justify === 'end',
        [s.Flex_justifyBetween]: justify === 'between',
        [s.Flex_horizontal]: direction === 'horizontal',
        [s.Flex_disableInnerMargins]: disableInnerMargins,
        [s.Flex_wrap]: wrap,
      },
      className,
      flexConfig.className,
    );

    const styles = {
      ...flexConfig.style,
      ...style,
      gap: gapVars[gap],
    };

    return createElement(
      tagName,
      {
        ...props,
        ref,
        className: cls,
        style: styles,
      },
      children,
    );
  },
);
