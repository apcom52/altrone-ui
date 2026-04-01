import { createContext, useContext } from 'react';

type TabsContextType = {
  backdropId: string;
};

export const TabsContext = createContext<TabsContextType>({
  backdropId: 'tabs-backdrop',
});

export const useTabsContext = () => useContext(TabsContext);
