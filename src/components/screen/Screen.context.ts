import { createContext, useContext } from 'react';

type ScreenSidebarContextType = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const ScreenSidebarContext = createContext<ScreenSidebarContextType>({
  visible: true,
  setVisible: () => {},
});

export const useScreenSidebar = () => useContext(ScreenSidebarContext);
