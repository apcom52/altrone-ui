import { createContext, useContext } from 'react';

type CloseDropdownContextType = () => void;
export const CloseDropdownContext = createContext<CloseDropdownContextType>(() => null);
export const useCloseDropdownContext = () => useContext(CloseDropdownContext);

export type DropdownRadioContext = {
  value: any;
  onChange: (value: any) => void;
};
export const RadioListDropdownContext = createContext<DropdownRadioContext>({
  value: '',
  onChange: () => null
});
export const useRadioListDropdownContext = () => useContext(RadioListDropdownContext);
