import clsx from 'clsx';
import { ToolbarTitleProps } from '../Toolbar.types';
import s from './title.module.scss';
import { ChevronDown } from 'lucide-react';
import { Button } from 'components/button';
import { motion } from 'motion/react';

export const Title = (props: ToolbarTitleProps) => {
  const { label, className, clickable = false, ...restProps } = props;

  const cls = clsx(s.Title, className);

  return (
    <motion.div layout className={cls} {...restProps}>
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
};
