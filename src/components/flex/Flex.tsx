import { memo } from 'react';
import { FlexProps } from './Flex.types.ts';
import clsx from 'clsx';
import s from './flex.module.scss';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';

export const Flex = memo<FlexProps>(
  ({
    children,
    className,
    align,
    justify,
    gap = 'none',
    direction = 'vertical',
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
      gap: `${gap}px`,
    };

    return (
      <div className={cls} style={styles} {...props}>
        {children}
      </div>
    );
  },
);
