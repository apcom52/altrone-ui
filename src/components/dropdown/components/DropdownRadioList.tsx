import { DropdownRadioListProps } from '../Dropdown.types';
import {
  DropdownRadioContext,
  RadioListDropdownContext,
} from '../Dropdown.contexts';
import { useId, useMemo } from 'react';
import clsx from 'clsx';
import s from './radioList.module.scss';

export function DropdownRadioList({
  ref,
  onChange,
  value,
  children,
  label,
  className,
  style,
  ...props
}: DropdownRadioListProps) {
  const labelId = useId();

  const contextValue: DropdownRadioContext = useMemo(
    () => ({
      value,
      onChange,
    }),
    [value, onChange],
  );

  const cls = clsx(s.RadioList, 'no-selection', className);
  const styles = {
    ...style,
  };

  return (
    <RadioListDropdownContext.Provider value={contextValue}>
      <div
        ref={ref}
        role="radiogroup"
        aria-labelledby={labelId}
        className={cls}
        style={styles}
        {...props}
      >
        {label ? (
          <div className={s.Title} id={labelId}>
            {label}
          </div>
        ) : null}
        {children}
      </div>
    </RadioListDropdownContext.Provider>
  );
}
DropdownRadioList.displayName = 'DropdownRadioList';
