import { memo } from 'react';
import clsx from 'clsx';
import { ToolbarTitleProps } from '../Toolbar.types';
import s from './title.module.scss';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useToolbarContext } from '../Toolbar.context.ts';
import { Text } from 'components/text/Text.tsx';

export const Title = memo(
  ({
    ref,
    label,
    className,
    clickable = false,
    ...restProps
  }: ToolbarTitleProps) => {
    const { variant } = useToolbarContext();
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
          {label}
        </Text>
        {clickable && <ChevronDown className={s.Chevron} aria-hidden />}
      </motion.div>
    );
  },
);
