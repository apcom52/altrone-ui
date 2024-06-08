import { createContext, useContext } from 'react';
import { FormContextType } from './Form.types.ts';

export const FormContext = createContext<FormContextType>({});
export const useFormContext = () => useContext(FormContext);
