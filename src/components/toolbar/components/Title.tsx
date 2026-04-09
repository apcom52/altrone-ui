import { memo } from 'react';
import clsx from 'clsx';
import { ToolbarTitleProps } from '../Toolbar.types';
import s from './title.module.scss';
import { ChevronDown } from 'lucide-react';
import { Button } from 'components/button/Button.tsx';
import { motion } from 'motion/react';

export const Title = memo(({ ref, label, className, clickable = false, ...restProps }: ToolbarTitleProps) => {
  const cls = clsx(s.Title, className);

  return (
    <motion.div ref={ref} layout className={cls} {...restProps}>
      {label}
      {clickable && (
        <Button
          className={s.ToggleButton}
          icon={<ChevronDown />}
          label="Open"
          showLabel={false}
          size="mini"
        />
      )}
    </motion.div>
  );
});
