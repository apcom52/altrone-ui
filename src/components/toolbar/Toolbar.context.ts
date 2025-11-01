import { Placement } from '@floating-ui/react';
import { createContext, useContext } from 'react';

export const ToolbarPlacementContext = createContext<Placement>('top');
export const useToolbarPlacement = () => useContext(ToolbarPlacementContext);
