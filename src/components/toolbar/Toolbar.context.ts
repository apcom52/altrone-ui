import { createContext, useContext } from 'react';
import { Size } from 'types';
import { ToolbarEdge, ToolbarVariant } from './Toolbar.types.ts';

export interface ToolbarContextValue {
  edge: ToolbarEdge;
  orientation: 'horizontal' | 'vertical';
  variant: ToolbarVariant;
  size: Size;
}

export const ToolbarContext = createContext<ToolbarContextValue>({
  edge: 'top',
  orientation: 'horizontal',
  variant: 'solid',
  size: 'm',
});

export const useToolbarContext = () => useContext(ToolbarContext);
