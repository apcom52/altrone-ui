import { createContext, useContext } from 'react';
import type { FormFieldContextType } from '../Form.types.ts';

export const FormFieldContext = createContext<FormFieldContextType>({
  name: '',
  disabled: false,
  invalid: false,
  size: 'm',
});

export const useFormField = () => useContext(FormFieldContext);
