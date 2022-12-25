import { memo } from 'react';
import { Radio } from './index';
import { Direction, Option } from '../../../types';
import clsx from 'clsx';
import './radio-list.scss';

export type Value = number | string | boolean;

interface RadioListProps {
  name: string;
  value: Value;
  options: Option[];
  onChange: (value: Option['value']) => void;
  direction?: Direction;
  disabled?: boolean;
}

const RadioList = ({
  value,
  options = [],
  disabled = false,
  direction = Direction.horizontal,
  onChange,
  name
}: RadioListProps) => {
  return (
    <div
      className={clsx('alt-radio-list', {
        'alt-radio-list--vertical': direction === Direction.vertical
      })}
      data-testid="alt-test-radiolist"
    >
      {options.map((option, optionIndex) => (
        <Radio
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

export default memo(RadioList);
