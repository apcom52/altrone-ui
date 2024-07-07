import { memo } from 'react';
import { Icon } from 'components/icon';
import s from './Spinner.module.scss';
import { Size } from 'types';
import clsx from 'clsx';
import { useLocalization } from '../../application/useLocalization.tsx';

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
    size = 'm',
  }) => {
    const t = useLocalization();

    const topDisabled = disabledUp || disabled;
    const bottomDisabled = disabledDown || disabled;

    const cls = clsx(s.Spinner, {
      [s.Small]: size === 's',
      [s.Large]: size === 'l',
    });

    return (
      <div className={cls}>
        <button
          type="button"
          disabled={topDisabled}
          className={s.SpinButton}
          onClick={onUpClick}
          title={t('numberInput.increase')}
        >
          <Icon i="keyboard_arrow_up" />
        </button>
        <button
          type="button"
          disabled={bottomDisabled}
          className={s.SpinButton}
          onClick={onDownClick}
          title={t('numberInput.decrease')}
        >
          <Icon i="keyboard_arrow_down" />
        </button>
      </div>
    );
  },
);
