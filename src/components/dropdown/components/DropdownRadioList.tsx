import { DropdownRadioListProps } from '../Dropdown.types';
import {
  DropdownRadioContext,
  RadioListDropdownContext,
} from '../Dropdown.contexts';
import { useId, useMemo } from 'react';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';
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
  const { dropdownRadioList: dropdownRadioListConfig = {} } =
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

  return (
    <RadioListDropdownContext.Provider value={contextValue}>
      <div
        className={cls}
        role="radiogroup"
        aria-labelledby={labelId}
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
