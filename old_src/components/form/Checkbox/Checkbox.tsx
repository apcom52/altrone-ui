import { memo, useId } from 'react';
import './checkbox.scss';
import clsx from 'clsx';
import { BasicInput, BasicInputProps } from '../BasicInput';
import { CheckboxIcon, CheckboxIconProps } from './CheckboxIcon';

interface CheckboxProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'size' | 'ref' | 'checked'>,
    Omit<BasicInputProps, 'size'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  danger?: boolean;
  CheckIconComponent?: React.FC<CheckboxIconProps>;
}

const Checkbox = ({
  disabled,
  id,
  checked = false,
  danger = false,
  children,
  CheckIconComponent = CheckboxIcon,
  className,
  onChange,
  hintText,
  errorText,
  ...props
}: CheckboxProps) => {
  const generatedCheckboxId = useId();

  const checkboxId = id || generatedCheckboxId;

  return (
    <BasicInput
      hintText={hintText}
      errorText={errorText}
      disabled={disabled}
      className="alt-checkbox-wrapper">
      <label
        htmlFor={checkboxId}
        className={clsx('alt-checkbox', className, {
          'alt-checkbox--danger': danger
        })}>
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          {...props}
          className="alt-checkbox__input"
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="alt-checkbox__control">
          <div className="alt-checkbox__icon">
            <CheckIconComponent checked={checked} />
          </div>
          {children && <div className="alt-checkbox__label">{children}</div>}
        </div>
      </label>
    </BasicInput>
  );
};

export default memo(Checkbox) as typeof Checkbox;
