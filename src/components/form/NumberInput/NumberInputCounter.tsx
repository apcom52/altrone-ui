import { Icon } from '../../icons';
import { memo, useCallback } from 'react';
import './number-input-counter.scss';

interface NumberInputCounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

const NumberInputCounter = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false
}: NumberInputCounterProps) => {
  const onIncreaseClick = useCallback(() => {
    if (max !== undefined && value + step > max) {
      onChange(max);
    } else {
      onChange(value + step);
    }
  }, [value, max, step, onChange]);

  const onDecreaseClick = useCallback(() => {
    if (min !== undefined && value - step < min) {
      onChange(min);
    } else {
      onChange(value - step);
    }
  }, [value, max, step, onChange]);

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

export default memo(NumberInputCounter);
