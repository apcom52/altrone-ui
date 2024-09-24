import { DropdownRadioListProps } from '../Dropdown.types';
import {
  DropdownRadioContext,
  RadioListDropdownContext,
} from '../Dropdown.contexts';
import { useId, useMemo } from 'react';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';
import s from './radioList.module.scss';

export function DropdownRadioList({
  onChange,
  value,
  children,
  label,
  className,
  style,
  ...props
}: DropdownRadioListProps) {
  const { dropdown: { radioList: dropdownRadioListConfig = {} } = {} } =
    useConfiguration();

  const labelId = useId();

  const contextValue: DropdownRadioContext = useMemo(
    () => ({
      value,
      onChange,
    }),
    [value, onChange],
  );

  const cls = clsx(s.RadioList, className, dropdownRadioListConfig.className);
  const styles = {
    ...dropdownRadioListConfig.style,
    ...style,
  };

  return (
    <RadioListDropdownContext.Provider value={contextValue}>
      <div
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
