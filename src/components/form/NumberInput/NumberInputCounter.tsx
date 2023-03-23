import { Icon } from '../../icons';
import { memo, MouseEventHandler, useCallback } from 'react';
import './number-input-counter.scss';

interface NumberInputCounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export const NumberInputCounter = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false
}: NumberInputCounterProps) => {
  const onIncreaseClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      let stepValue = step;
      if (e.altKey) {
        stepValue = 10 * step;
      } else if (e.shiftKey) {
        stepValue = 100 * step;
      }

      if (max !== undefined && value + stepValue > max) {
        onChange(max);
      } else {
        onChange(value + stepValue);
      }
    },
    [value, max, step, onChange]
  );

  const onDecreaseClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      let stepValue = step;
      if (e.altKey) {
        stepValue = 10 * step;
      } else if (e.shiftKey) {
        stepValue = 100 * step;
      }

      if (min !== undefined && value - stepValue < min) {
        onChange(min);
      } else {
        onChange(value - stepValue);
      }
    },
    [value, max, step, onChange]
  );

  const isIncreaseDisabled = disabled || (max !== undefined && value === max);
  const isDecreaseDisabled = disabled || (min !== undefined && value === min);

  return (
    <div className="alt-number-input-counter">
      <button
        className="alt-number-input-counter__increase"
        onClick={onIncreaseClick}
        disabled={isIncreaseDisabled}
        type="button">
        <Icon i="expand_less" />
      </button>
      <button
        className="alt-number-input-counter__decrease"
        onClick={onDecreaseClick}
        disabled={isDecreaseDisabled}
        type="button">
        <Icon i="expand_more" />
      </button>
    </div>
  );
};
