import { MouseEvent, useId } from 'react';
import { SpoilerProps } from './Spoiler.types.ts';
import clsx from 'clsx';
import s from './spoiler.module.scss';
import { useBoolean } from 'utils';
import { Plus, Minus } from 'lucide-react';
import { AnimatePresence, motion, type Transition } from 'motion/react';

/** Near-critically damped — a lively settle, no visible bounce. */
const EXPAND_TRANSITION: Transition = {
  height: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 },
  opacity: { duration: 0.15, ease: 'linear' },
};
/** Quick, clean close — no spring so it doesn't linger. */
const COLLAPSE_TRANSITION: Transition = {
  height: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  opacity: { duration: 0.1, ease: 'linear' },
};

export const Spoiler = ({
  ref,
  children,
  className,
  style,
  openedByDefault = false,
  title,
  onToggle,
  ...restProps
}: SpoilerProps) => {
  const { value: opened, toggle } = useBoolean(openedByDefault);
  const contentId = useId();

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    toggle();
    onToggle?.(!opened, event);
  };

  return (
    <div
      ref={ref}
      className={clsx(s.Spoiler, className)}
      style={style}
      {...restProps}
    >
      <button
        type="button"
        className={s.Heading}
        aria-expanded={opened}
        aria-controls={contentId}
        onClick={handleToggle}
      >
        <span className={s.Title}>{title}</span>
        <span className={s.ArrowIcon} aria-hidden={true}>
          {opened ? <Minus /> : <Plus />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {opened && (
          <motion.div
            id={contentId}
            className={s.Content}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: EXPAND_TRANSITION,
            }}
            exit={{ height: 0, opacity: 0, transition: COLLAPSE_TRANSITION }}
          >
            <div className={s.ContentInner}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
