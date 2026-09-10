import { createContext, useContext } from 'react';

export interface ScreenContextValue {
  /**
   * `inline` — `Screen.Sidebar` is a grid column; `overlay` — it's an
   * off-canvas panel with a scrim, below `Screen`'s `mobileBreakpoint`.
   */
  sidebarMode: 'inline' | 'overlay';
}

const ScreenContext = createContext<ScreenContextValue>({
  sidebarMode: 'inline',
});

export const ScreenContextProvider = ScreenContext.Provider;

export const useScreenContext = (): ScreenContextValue =>
  useContext(ScreenContext);
