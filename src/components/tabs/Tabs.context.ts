import { createContext, useContext } from 'react';
import type { Size } from 'types';

type TabsContextType = {
  backdropId: string;
  size: Size;
};

export const TabsContext = createContext<TabsContextType>({
  backdropId: 'tabs-backdrop',
  size: 'm',
});

export const useTabsContext = () => useContext(TabsContext);
