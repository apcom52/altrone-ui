import { createContext, useContext } from 'react';
import { SelectContextValue } from './Select.types.ts';

export const SelectContext = createContext<SelectContextValue | null>(null);

/**
 * Live `Select` state (open, value, resolved options, `clear`) for a
 * component rendered inside `asChild`. Throws outside `<Select>`.
 */
export const useSelectContext = (): SelectContextValue => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error('useSelectContext must be used within <Select>');
  }

  return context;
};
