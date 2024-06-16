import { createElement, memo } from 'react';
import { FlexProps } from './Flex.types.ts';
import clsx from 'clsx';
import s from './flex.module.scss';
import { useConfiguration } from 'components/configuration';
import { Gap } from 'types';

const gapValues: Record<Gap, number> = {
  none: 0,
  xxs: 2,
  xs: 4,
  s: 6,
  m: 8,
  l: 12,
  xl: 24,
  xxl: 32,
};

export const Flex = memo<FlexProps>(
  ({
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
    const { flex = {} } = useConfiguration();

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
      flex.className,
    );

    const styles = {
      ...flex.style,
      ...style,
      gap: `${gapValues[gap]}px`,
    };

    return createElement(
      tagName,
      {
        ...props,
        className: cls,
        style: styles,
      },
      children,
    );
  },
);
