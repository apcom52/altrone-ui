import { cloneElement, memo, ReactElement } from 'react';
import clsx from 'clsx';
import { ToolbarTitleProps } from '../Toolbar.types';
import s from './title.module.scss';
import { motion } from 'motion/react';
import { useToolbarContext } from '../Toolbar.context.ts';
import { Text } from 'components/text/Text.tsx';

export const Title = memo(
  ({
    ref,
    title,
    className,
    clickable = false,
    ...restProps
  }: ToolbarTitleProps) => {
    const { variant, icons } = useToolbarContext();
    const cls = clsx(
      s.Title,
      {
        [s.OnContent]: variant === 'grouped',
        [s.Clickable]: clickable,
      },
      className,
    );

    return (
      <motion.div ref={ref} className={cls} {...restProps}>
        <Text truncate weight="bold" className={s.Label}>
          {title}
        </Text>
        {clickable &&
          cloneElement(
            icons.titleMenu as ReactElement<{
              className?: string;
              'aria-hidden'?: boolean;
            }>,
            { className: s.Chevron, 'aria-hidden': true },
          )}
      </motion.div>
    );
  },
);
