import { Size } from '../../types';
import { createContext, useContext } from 'react';

export const TextInputSizeContext = createContext<Size>('m');
export const useTextInputSize = () => useContext(TextInputSizeContext);

export const TextInputValueSizeContext = createContext<{
  valueLength: number;
  maxLength?: number;
}>({ valueLength: 0 });
export const useTextInputValueSize = () =>
  useContext(TextInputValueSizeContext);
