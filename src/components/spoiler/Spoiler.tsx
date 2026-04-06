import { memo } from 'react';
import React from 'react';
import { SpoilerProps } from './Spoiler.types.ts';
import clsx from 'clsx';
import s from './spoiler.module.scss';
import { useBoolean } from '../../utils';
import { useConfiguration } from 'components/configuration';
import { Plus, Minus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const Spoiler = memo(
  ({
    ref,
    children,
    className,
    style,
    openedByDefault = false,
    title,
    onToggle,
    ...restProps
  }: SpoilerProps) => {
    const { spoiler: spoilerConfig = {} } = useConfiguration();

    const { value: opened, toggle } = useBoolean(openedByDefault);

    const cls = clsx(s.Spoiler, className, spoilerConfig.className);

    const styles = {
      ...spoilerConfig.style,
      ...style,
    };

    const handleToggle = (event: React.MouseEvent<HTMLDivElement>) => {
      toggle();
      onToggle?.(!opened, event);
    };

    return (
      <div ref={ref} className={cls} style={styles} {...restProps}>
        <div tabIndex={0} className={s.Heading} onClick={handleToggle}>
          {title}
          <div className={s.ArrowIcon} aria-hidden={true}>
            {opened ? <Minus /> : <Plus />}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {opened && (
            <motion.div
              className={s.Content}
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2, ease: 'linear' }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
