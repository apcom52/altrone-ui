import { memo, useId } from 'react';
import { Align } from '../../../types';
import clsx from 'clsx';
import './switcher.scss';
import { BasicInput, BasicInputProps } from '../BasicInput';

interface SwitcherProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'checked' | 'onChange' | 'size'>,
    Omit<BasicInputProps, 'size'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  danger?: boolean;
  align?: Align;
}

const Switcher = ({
  children,
  checked = false,
  danger = false,
  align = Align.start,
  onChange,
  id,
  className,
  disabled,
  errorText,
  hintText,
  ...props
}: SwitcherProps) => {
  const generatedSwitcherId = useId();

  const switcherId = id || generatedSwitcherId;

  return (
    <BasicInput errorText={errorText} hintText={hintText}>
      <label
        htmlFor={switcherId}
        className={clsx('alt-switcher', className, {
          'alt-switcher--danger': danger,
          'alt-switcher--pin-end': align === Align.end,
          'alt-switcher--disabled': disabled
        })}>
        <input
          id={switcherId}
          type="checkbox"
          disabled={disabled}
          checked={checked}
          {...props}
          className="alt-switcher__input"
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="alt-switcher__indicator"></div>
        {children && <div className="alt-switcher__label">{children}</div>}
      </label>
    </BasicInput>
  );
};

export default memo(Switcher) as typeof Switcher;
