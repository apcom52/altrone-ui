import React, { memo } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import s from './pickerCell.module.scss';

/** Month / year cell — mirrors `Calendar.Date`'s hover pill + animated selected chip. */
export type PickerCellProps = {
  label: React.ReactNode;
  selected: boolean;
  disabled: boolean;
  onSelect?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> & {
    ref?: React.Ref<HTMLButtonElement>;
  };

export const PickerCell = memo(
  ({
    ref,
    label,
    selected,
    disabled,
    onSelect,
    className,
    onClick,
    ...rest
  }: PickerCellProps) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={clsx(
        s.Cell,
        { [s.Selected]: selected, [s.Disabled]: disabled },
        className,
      )}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        if (!disabled) onSelect?.(event);
      }}
    >
      <AnimatePresence>
        {selected ? (
          <motion.span
            className={s.SelectedPill}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, transition: { type: 'tween', duration: 0.12 } }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 22,
              mass: 0.6,
            }}
          />
        ) : null}
      </AnimatePresence>
      <span className={s.Label}>{label}</span>
    </button>
  ),
);
