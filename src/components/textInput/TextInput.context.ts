import { Size } from '../../types';
import { createContext, useContext } from 'react';

export const TextInputSizeContext = createContext<Size>('m');
export const useTextInputSize = () => useContext(TextInputSizeContext);
