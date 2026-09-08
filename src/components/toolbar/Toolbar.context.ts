import { createContext, useContext } from 'react';
import { Size } from 'types';
import { ToolbarPlacement, ToolbarVariant } from './Toolbar.types.ts';

export interface ToolbarContextValue {
  placement: ToolbarPlacement;
  orientation: 'horizontal' | 'vertical';
  variant: ToolbarVariant;
  size: Size;
}

export const ToolbarContext = createContext<ToolbarContextValue>({
  placement: 'top',
  orientation: 'horizontal',
  variant: 'glass',
  size: 'm',
});

export const useToolbarContext = () => useContext(ToolbarContext);
