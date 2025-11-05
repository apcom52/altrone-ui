import { memo } from 'react';
import { SpoilerProps } from './Spoiler.types.ts';
import clsx from 'clsx';
import s from './spoiler.module.scss';
import { useBoolean } from '../../utils';
import { useConfiguration } from 'components/configuration';
import { Plus, Minus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const Spoiler = memo<SpoilerProps>(
  ({
    children,
    className,
    style,
    openedByDefault = false,
    title,
    onToggle,
    ...restProps
  }) => {
    const { spoiler: spoilerConfig = {} } = useConfiguration();

    const { value: opened, toggle } = useBoolean(openedByDefault);

    const cls = clsx(
      s.Spoiler,
      {
        [s.Opened]: opened,
      },
      className,
      spoilerConfig.className
    );

    const styles = {
      ...spoilerConfig.style,
      ...style,
    };

    return (
      <div className={cls} style={styles} {...restProps}>
        <div tabIndex={0} className={s.Heading} onClick={toggle}>
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
  }
);
