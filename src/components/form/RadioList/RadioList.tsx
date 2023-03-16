import { memo } from 'react';
import { Radio } from './index';
import { Direction, Option } from '../../../types';
import clsx from 'clsx';
import './radio-list.scss';

interface RadioListProps<T = unknown> {
  name: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  direction?: Direction;
  disabled?: boolean;
}

const RadioList = <T extends unknown>({
  value,
  options = [],
  disabled = false,
  direction = Direction.horizontal,
  onChange,
  name
}: RadioListProps<T>) => {
  return (
    <div
      className={clsx('alt-radio-list', {
        'alt-radio-list--vertical': direction === Direction.vertical
      })}
      data-testid="alt-test-radiolist">
      {options.map((option, optionIndex) => (
        <Radio<T>
          key={optionIndex}
          checked={option.value === value}
          onChange={onChange}
          name={name}
          disabled={disabled || option.disabled}
          {...option}
        />
      ))}
    </div>
  );
};

export default memo(RadioList) as typeof RadioList;
