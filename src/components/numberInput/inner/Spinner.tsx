import { memo } from 'react';
import { Icon } from 'components';
import s from './Spinner.module.scss';

interface SpinnerProps {
  disabled?: boolean;
  disabledUp?: boolean;
  disabledDown?: boolean;
  onUpClick?: () => void;
  onDownClick?: () => void;
}

export const Spinner = memo(() => {
  return (
    <div className={s.Spinner}>
      <button type="button" className={s.Up}>
        <Icon i="keyboard_arrow_up" />
      </button>
      <button type="button" className={s.Down}>
        <Icon i="keyboard_arrow_down" />
      </button>
    </div>
  );
});
