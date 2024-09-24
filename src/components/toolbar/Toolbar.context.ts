import { createContext, useContext } from 'react';
import { ToolbarContextType } from './Toolbar.types.ts';

export const ToolbarContext = createContext<ToolbarContextType>({
  compact: false,
});
export const useToolbarContext = () => useContext(ToolbarContext);
