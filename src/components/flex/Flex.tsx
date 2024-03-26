import { memo } from 'react';
import { FlexProps } from './Flex.types.ts';
import clsx from 'clsx';
import { Align, Direction, Gap } from '../../types';
import s from './flex.module.scss';

export const Flex = memo<FlexProps>(
  ({
    children,
    className,
    align = Align.start,
    justify = Align.start,
    gap = Gap.none,
    direction = Direction.vertical,
    style,
    disableInnerMargins = true,
    ...props
  }) => {
    const cls = clsx(
      s.Flex,
      {
        [s.Flex_alignStart]: align === Align.start,
        [s.Flex_alignCenter]: align === Align.center,
        [s.Flex_alignEnd]: align === Align.end,
        [s.Flex_justifyStart]: justify === Align.start,
        [s.Flex_justifyCenter]: justify === Align.center,
        [s.Flex_justifyEnd]: justify === Align.end,
        [s.Flex_horizontal]: direction === Direction.horizontal,
        [s.Flex_disableInnerMargins]: disableInnerMargins,
      },
      className,
    );

    const styles = {
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
