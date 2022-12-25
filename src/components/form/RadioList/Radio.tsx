import { memo, useId } from 'react';
import { Option } from '../../../types';

export interface RadioProps extends Option {
  name: string;
  checked: boolean;
  onChange: (value: Option['value']) => void;
}

const Radio = ({ name, checked, label, disabled, value, onChange }: RadioProps) => {
  const id = useId();

  return (
    <label htmlFor={id} className="alt-radio" data-testid="alt-test-radio">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        className="alt-radio__input"
        disabled={disabled}
        onChange={() => onChange(value)}
        id={id}
      />
      <div className="alt-radio__control">
        <div className="alt-radio__icon" />
        <div className="alt-radio__label">{label}</div>
      </div>
    </label>
  );
};

export default memo(Radio);
