import { DropdownRadioListProps } from '../Dropdown.types';
import './action.scss';
import { DropdownRadioContext, RadioListDropdownContext } from '../Dropdown.contexts';
import { useMemo } from 'react';

export function DropdownRadioList({ onChange, value, children }: DropdownRadioListProps) {
  const contextValue: DropdownRadioContext = useMemo(
    () => ({
      value,
      onChange
    }),
    [value, onChange]
  );

  return (
    <RadioListDropdownContext.Provider value={contextValue}>
      {children}
    </RadioListDropdownContext.Provider>
  );
}
DropdownRadioList.displayName = 'DropdownRadioList';
