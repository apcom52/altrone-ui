import { createContext, useContext } from 'react';
import { RadioContext } from './Radio.types.ts';

export const RadioContextWrapper = createContext<RadioContext>({
  value: '',
  onChange: () => null,
  name: '',
  disabled: false,
});
export const useRadioContext = () => useContext(RadioContextWrapper);
