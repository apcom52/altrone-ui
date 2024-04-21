import { memo } from 'react';
import { Icon } from 'components';
import s from './Spinner.module.scss';
import { Size } from 'types';
import clsx from 'clsx';

interface SpinnerProps {
  disabled?: boolean;
  disabledUp?: boolean;
  disabledDown?: boolean;
  onUpClick?: () => void;
  onDownClick?: () => void;
  size?: Size;
}

export const Spinner = memo<SpinnerProps>(
  ({
    disabled,
    disabledUp,
    disabledDown,
    onDownClick,
    onUpClick,
    size = Size.medium,
  }) => {
    const topDisabled = disabledUp || disabled;
    const bottomDisabled = disabledDown || disabled;

    const cls = clsx(s.Spinner, {
      [s.Small]: size === Size.small,
      [s.Large]: size === Size.large,
    });

    return (
      <div className={cls}>
        <button
          type="button"
          disabled={topDisabled}
          className={s.SpinButton}
          onClick={onUpClick}
        >
          <Icon i="keyboard_arrow_up" />
        </button>
        <button
          type="button"
          disabled={bottomDisabled}
          className={s.SpinButton}
          onClick={onDownClick}
        >
          <Icon i="keyboard_arrow_down" />
        </button>
      </div>
    );
  },
);
